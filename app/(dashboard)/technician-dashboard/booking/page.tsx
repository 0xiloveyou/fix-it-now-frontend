"use client";

import { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Booking {
  id: string;
  status:
    | "REQUESTED"
    | "ACCEPTED"
    | "DECLINED"
    | "PAID"
    | "IN_PROGRESS"
    | "COMPLETED"
    | "CANCELLED";

  address: string;
  note?: string;
  totalPrice: number;

  customer: {
    id: string;
    name: string;
    email: string;
  };

  service: {
    id: string;
    title: string;
    duration: number;
    price: number;
  };

  slot: {
    id: string;
    date: string;
    startTime: string;
    endTime: string;
  };
}

export default function TechnicianBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState("");

  const fetchBookings = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/bookings/technician`,
        {
          credentials: "include",
          cache: "no-store",
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      setBookings(result.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (
    bookingId: string,
    status: "ACCEPTED" | "DECLINED"
  ) => {
    try {
      setUpdatingId(bookingId);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/bookings/${bookingId}/status`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      fetchBookings();
    } catch (error) {
      console.error(error);
      alert("Failed to update booking status.");
    } finally {
      setUpdatingId("");
    }
  };

  const badgeVariant = (status: Booking["status"]) => {
    switch (status) {
      case "COMPLETED":
        return "default";

      case "DECLINED":
      case "CANCELLED":
        return "destructive";

      default:
        return "secondary";
    }
  };

  if (loading) {
    return (
      <div className="py-12 text-center">
        <Loader2 className="animate-spin mx-auto mb-4" />
        <p>Loading bookings...</p>
      </div>
    );
  }

  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Service Bookings
        </h1>

        <p className="text-muted-foreground mt-2">
          Manage customer booking requests.
        </p>
      </div>

      {bookings.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              No bookings found.
            </p>
          </CardContent>
        </Card>
      ) : (
        bookings.map((booking) => (
          <Card key={booking.id}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>
                  {booking.service.title}
                </CardTitle>

                <p className="text-sm text-muted-foreground mt-1">
                  Booking ID: {booking.id}
                </p>
              </div>

              <Badge variant={badgeVariant(booking.status)}>
                {booking.status}
              </Badge>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{booking.customer.name}</span>
                  </div>

                  <p>
                    <strong>Email:</strong>{" "}
                    {booking.customer.email}
                  </p>

                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-1" />
                    <span>{booking.address}</span>
                  </div>

                  <p>
                    <strong>Note:</strong>{" "}
                    {booking.note || "No note"}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{booking.slot.date}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>
                      {booking.slot.startTime} -{" "}
                      {booking.slot.endTime}
                    </span>
                  </div>

                  <p>
                    <strong>Duration:</strong>{" "}
                    {booking.service.duration} Minutes
                  </p>

                  <p>
                    <strong>Price:</strong> ৳
                    {booking.totalPrice}
                  </p>
                </div>
              </div>

              {booking.status === "REQUESTED" && (
                <div className="flex gap-3">
                  <Button
                    disabled={updatingId === booking.id}
                    onClick={() =>
                      updateStatus(
                        booking.id,
                        "ACCEPTED"
                      )
                    }
                  >
                    {updatingId === booking.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      "Accept Booking"
                    )}
                  </Button>

                  <Button
                    variant="destructive"
                    disabled={updatingId === booking.id}
                    onClick={() =>
                      updateStatus(
                        booking.id,
                        "DECLINED"
                      )
                    }
                  >
                    Decline Booking
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </main>
  );
}