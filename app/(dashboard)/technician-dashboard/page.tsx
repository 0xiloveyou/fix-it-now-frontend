"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Briefcase,
  Calendar,
  ClipboardList,
  DollarSign,
  Loader2,
  UserCog,
  Wrench,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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

  service: {
    id: string;
    title: string;
  };
}

export default function TechnicianDashboardPage() {
  const [loading, setLoading] = useState(true);
 const [bookings, setBookings] = useState<Booking[]>([]);
  const [reviewCount, setReviewCount] = useState(0);

  const [stats, setStats] = useState({
    services: 0,
    pending: 0,
    active: 0,
    completed: 0,
    earnings: 0,
  });

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        // Logged in user
        const userRes = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/auth/user/me`,
          {
            credentials: "include",
          }
        );

        const user = await userRes.json();

        if (!userRes.ok) {
          throw new Error(user.message);
        }

        const technicianId = user.data.user.id;

        // Reviews
        const reviewRes = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/reviews/technician/${technicianId}`,
          {
            credentials: "include",
            cache: "no-store",
          }
        );

        const reviewResult = await reviewRes.json();

        setReviewCount(reviewResult.data?.length || 0);

        // Technician bookings
        const bookingRes = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/bookings/technician`,
          {
            credentials: "include",
            cache: "no-store",
          }
        );

        const bookingResult = await bookingRes.json();

       const bookingsData: Booking[] = bookingResult.data || [];

setBookings(bookingsData);

        const pending = bookings.filter(
          (b) => b.status === "REQUESTED"
        ).length;

        const active = bookings.filter(
          (b) => b.status === "IN_PROGRESS"
        ).length;

        const completed = bookings.filter(
          (b) => b.status === "COMPLETED"
        ).length;

        const earnings = bookings
          .filter(
            (b) =>
              b.status === "PAID" ||
              b.status === "COMPLETED"
          )
          .reduce((sum, booking) => sum + booking.totalPrice, 0);
bookings.filter 
        // Count unique services
        const services = new Set(
          bookings.map((b) => b.service.id)
        ).size;

        setStats({
          services,
          pending,
          active,
          completed,
          earnings,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  return (
  <div className="space-y-8">
    {/* Heading */}
    <div>
      <h1 className="text-3xl font-bold">
        Technician Dashboard
      </h1>

      <p className="mt-1 text-muted-foreground">
        Manage your services, bookings, earnings and availability.
      </p>
    </div>

    {/* Statistics */}
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
      <Card>
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="text-sm text-muted-foreground">
              My Services
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {loading ? "..." : stats.services}
            </h2>
          </div>

          <Briefcase className="h-9 w-9 text-primary" />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="text-sm text-muted-foreground">
              Pending Bookings
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {loading ? "..." : stats.pending}
            </h2>
          </div>

          <ClipboardList className="h-9 w-9 text-orange-500" />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="text-sm text-muted-foreground">
              Active Jobs
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {loading ? "..." : stats.active}
            </h2>
          </div>

          <Wrench className="h-9 w-9 text-blue-500" />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="text-sm text-muted-foreground">
              Completed Jobs
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {loading ? "..." : stats.completed}
            </h2>
          </div>

          <Calendar className="h-9 w-9 text-green-600" />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="text-sm text-muted-foreground">
              Total Earnings
            </p>

            <h2 className="mt-2 text-3xl font-bold text-green-600">
              {loading
                ? "..."
                : `৳ ${stats.earnings.toLocaleString()}`}
            </h2>
          </div>

          <DollarSign className="h-9 w-9 text-green-600" />
        </CardContent>
      </Card>
    </div>

    {/* Quick Actions */}
<Card>
  <CardContent className="p-6">
    <h2 className="mb-5 text-xl font-semibold">
      Quick Actions
    </h2>

    <div className="flex flex-wrap gap-4">

      <Link href="/technician-dashboard/category">
        <Button>View Category</Button>
      </Link>

      <Link href="/technician-dashboard/createtechnicianprofile">
        <Button variant="outline">
          <UserCog className="mr-2 h-4 w-4" />
          Create Technician Profile
        </Button>
      </Link>

      <Link href="/technician-dashboard/services">
        <Button variant="outline">
          My Services
        </Button>
      </Link>

      <Link href="/technician-dashboard/booking">
        <Button variant="outline">
          View Bookings
        </Button>
      </Link>

      <Link href="/technician-dashboard/myfeedback">
        <Button variant="outline" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </>
          ) : (
            `My Feedback (${reviewCount})`
          )}
        </Button>
      </Link>

      <Link href="/technician-dashboard/availability">
        <Button variant="outline">
          Availability
        </Button>
      </Link>

    </div>
  </CardContent>
</Card>

{/* Recent Bookings */}
<Card>
  <CardContent className="p-6">
    <h2 className="mb-4 text-xl font-semibold">
      Recent Bookings
    </h2>

    {bookings.length === 0 ? (
      <p className="text-muted-foreground">
        No bookings available.
      </p>
    ) : (
      <div className="space-y-3">
        {bookings.slice(0, 5).map((booking) => (
          <div
            key={booking.id}
            className="flex items-center justify-between border rounded-lg p-3"
          >
            <div>
              <h3 className="font-medium">
                {booking.service.title}
              </h3>

              <p className="text-sm text-muted-foreground">
                {booking.status}
              </p>
            </div>

            <p className="font-semibold">
              ৳{booking.totalPrice}
            </p>
          </div>
        ))}
      </div>
    )}
  </CardContent>
</Card>

{/* Recent Services */}
<Card>
  <CardContent className="p-6">
    <h2 className="mb-4 text-xl font-semibold">
      Services Overview
    </h2>

    <p className="text-muted-foreground">
      You currently offer{" "}
      <strong>{stats.services}</strong> service(s).
    </p>
  </CardContent>
</Card>
  </div>
);
}
