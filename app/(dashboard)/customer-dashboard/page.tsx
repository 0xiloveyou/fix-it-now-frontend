"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  CalendarCheck,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
  totalPrice: number;
  createdAt: string;

  service: {
    id: string;
    title: string;
  };
}

export default function CustomerDashboardPage() {
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
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getBookings();
  }, []);

  const totalBookings = bookings.length;

  const activeBookings = useMemo(() => {
    return bookings.filter((booking) =>
      [
        "REQUESTED",
        "ACCEPTED",
        "PAID",
        "IN_PROGRESS",
      ].includes(booking.status)
    ).length;
  }, [bookings]);

  const completedBookings = useMemo(() => {
    return bookings.filter(
      (booking) => booking.status === "COMPLETED"
    ).length;
  }, [bookings]);

  const cancelledBookings = useMemo(() => {
    return bookings.filter(
      (booking) => booking.status === "CANCELLED"
    ).length;
  }, [bookings]);

  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold">
          Customer Dashboard
        </h1>

        <p className="text-muted-foreground mt-2">
          Manage your bookings and track service requests.
        </p>
      </div>

      {/* Statistics */}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">
                Total Bookings
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {loading ? "..." : totalBookings}
              </h2>
            </div>

            <CalendarCheck className="h-9 w-9 text-primary" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">
                Active Bookings
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {loading ? "..." : activeBookings}
              </h2>
            </div>

            <Clock className="h-9 w-9 text-primary" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">
                Completed
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {loading ? "..." : completedBookings}
              </h2>
            </div>

            <CheckCircle2 className="h-9 w-9 text-green-600" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">
                Cancelled
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {loading ? "..." : cancelledBookings}
              </h2>
            </div>

            <XCircle className="h-9 w-9 text-red-600" />
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}

      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-5">
            Quick Actions
          </h2>

          <div className="flex flex-wrap gap-4">
            <Link href="/services">
              <Button>Browse Services</Button>
            </Link>

            <Link href="/customer-dashboard/mybooking">
              <Button variant="outline">
                My Bookings
              </Button>
            </Link>

            <Link href="/customer-dashboard/profile">
              <Button variant="outline">
                My Profile
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Recent Bookings */}

      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-5">
            Recent Bookings
          </h2>

          {loading ? (
            <p>Loading...</p>
          ) : bookings.length === 0 ? (
            <p className="text-muted-foreground">
              You do not have any bookings yet.
            </p>
          ) : (
            <div className="space-y-4">
              {bookings.slice(0, 5).map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <h3 className="font-semibold">
                      {booking.service.title}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      {booking.status}
                    </p>
                  </div>

                  <div className="font-semibold">
                    ৳{booking.totalPrice}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}