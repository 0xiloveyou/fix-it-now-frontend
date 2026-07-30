"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  Eye,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Badge,
} from "@/components/ui/badge";

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

  useEffect(() => {
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
      } finally {
        setLoading(false);
      }
    };

    getBookings();
  }, []);

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
      <div className="container mx-auto py-10">
        <h2 className="text-2xl font-semibold">
          Loading bookings...
        </h2>
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

          <p className="text-muted-foreground mt-2">
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
            <h2 className="text-xl font-semibold mb-2">
              No bookings found
            </h2>

            <p className="text-muted-foreground mb-6">
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

                  <p className="text-sm text-muted-foreground mt-1">
                    Booking ID: {booking.id}
                  </p>
                </div>

                <Badge variant={getBadgeVariant(booking.status)}>
                  {booking.status}
                </Badge>
              </CardHeader>

              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
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
                      <Calendar className="w-4 h-4" />

                      <span>
                        {booking.slot.date}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />

                      <span>
                        {booking.slot.startTime} -{" "}
                        {booking.slot.endTime}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 mt-1" />

                      <span>{booking.address}</span>
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

                <div className="flex gap-3 mt-6">
                  <Link
                    href={`/customer-dashboard/mybooking/${booking.id}`}
                  >
                    <Button variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </Link>

                  {booking.status === "REQUESTED" && (
                    <Button variant="destructive">
                      Cancel Booking
                    </Button>
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