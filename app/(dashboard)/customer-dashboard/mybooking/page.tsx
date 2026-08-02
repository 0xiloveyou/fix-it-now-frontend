"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  Eye,
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
import { Star } from "lucide-react";
import { toast } from "sonner";

interface Booking {
  id: string;
  address: string;
  note?: string;
  totalPrice: number;
  status:
    | "REQUESTED"
    | "ACCEPTED"
    | "DECLINED"
    | "PAID"
    | "IN_PROGRESS"
    | "COMPLETED"
    | "CANCELLED";

  createdAt: string;

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

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelLoading, setCancelLoading] = useState<string | null>(null);

  useEffect(() => {
    getBookings();
  }, []);

  const getBookings = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/bookings/my`,
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
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) return;

    try {
      setCancelLoading(bookingId);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/bookings/${bookingId}/cancel`,
        {
          method: "PATCH", // Change to POST if your backend uses POST
          credentials: "include",
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      toast.success("Booking cancelled successfully.");

      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === bookingId
            ? {
                ...booking,
                status: "CANCELLED",
              }
            : booking
        )
      );
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to cancel booking"
      );
    } finally {
      setCancelLoading(null);
    }
  };

  const getBadgeVariant = (status: Booking["status"]) => {
    switch (status) {
      case "COMPLETED":
        return "default";

      case "CANCELLED":
      case "DECLINED":
        return "destructive";

      default:
        return "secondary";
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-10 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <main className="container mx-auto max-w-6xl py-10 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            My Bookings
          </h1>

          <p className="mt-2 text-muted-foreground">
            View and track all your service bookings.
          </p>
        </div>

        <Link href="/services">
          <Button>
            Book New Service
          </Button>
        </Link>
      </div>

      {bookings.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <h2 className="mb-2 text-xl font-semibold">
              No bookings found
            </h2>

            <p className="mb-6 text-muted-foreground">
              You have not booked any service yet.
            </p>

            <Link href="/services">
              <Button>
                Browse Services
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
                    {bookings.map((booking) => (
            <Card key={booking.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>
                    {booking.service.title}
                  </CardTitle>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Booking ID: {booking.id}
                  </p>
                </div>

                <Badge variant={getBadgeVariant(booking.status)}>
                  {booking.status}
                </Badge>
              </CardHeader>

              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">

                  <div className="space-y-3">

                    <p>
                      <strong>Price:</strong> ৳
                      {booking.totalPrice}
                    </p>

                    <p>
                      <strong>Duration:</strong>{" "}
                      {booking.service.duration} Minutes
                    </p>

                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />

                      <span>
                        {new Date(
                          booking.slot.date
                        ).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />

                      <span>
                        {booking.slot.startTime} -{" "}
                        {booking.slot.endTime}
                      </span>
                    </div>

                  </div>

                  <div className="space-y-3">

                    <div className="flex items-start gap-2">
                      <MapPin className="mt-1 h-4 w-4" />

                      <span>
                        {booking.address}
                      </span>
                    </div>

                    <p>
                      <strong>Note:</strong>{" "}
                      {booking.note || "No note"}
                    </p>

                    <p>
                      <strong>Booked On:</strong>{" "}
                      {new Date(
                        booking.createdAt
                      ).toLocaleDateString()}
                    </p>

                  </div>

                </div>

                <div className="mt-6 flex flex-wrap gap-3">

                  <Link
                    href={`/customer-dashboard/mybooking/${booking.id}`}
                  >
                    <Button variant="outline">
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                  </Link>

                  {booking.status === "REQUESTED" && (
                    <Button
                      variant="destructive"
                      disabled={
                        cancelLoading === booking.id
                      }
                      onClick={() =>
                        handleCancelBooking(
                          booking.id
                        )
                      }
                    >
                      {cancelLoading === booking.id ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Cancelling...
                        </>
                      ) : (
                        "Cancel Booking"
                      )}
                    </Button>
                  )}

                  {booking.status === "ACCEPTED" && (
                    <Link
                      href={`/customer-dashboard/payment/${booking.id}`}
                    >
                      <Button>
                        Pay Now
                      </Button>
                    </Link>
                  )}

                  {(booking.status === "PAID" ||
                    booking.status === "COMPLETED") && (
                    <Link
                      href={`/customer-dashboard/review/${booking.id}?service=${encodeURIComponent(
                        booking.service.title
                      )}`}
                    >
                      <Button>
                        <Star className="mr-2 h-4 w-4" />
                        Give Review
                      </Button>
                    </Link>
                  )}

                </div>

              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}