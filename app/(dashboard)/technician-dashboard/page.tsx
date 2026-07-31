"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Briefcase,
  Calendar,
  ClipboardList,
  Wrench,
} from "lucide-react";
import { UserCog } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


export default function TechnicianDashboardPage() {
  const [reviewCount, setReviewCount] = useState(0);
  useEffect(() => {
  const getReviewCount = async () => {
    try {
      const technicianId = "YOUR_TECHNICIAN_ID"; // Replace with logged-in technician ID

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/reviews/technician/${technicianId}`,
        {
          credentials: "include",
        }
      );

      const result = await res.json();

      if (res.ok) {
        setReviewCount(result.data?.length || 0);
      }
    } catch (error) {
      console.error(error);
    }
  };

  getReviewCount();
}, []);
  return (
    <div className="space-y-8">
      {/* Heading */}
      <div>
        <h1 className="text-3xl font-bold">
          Technician Dashboard
        </h1>

        <p className="mt-1 text-muted-foreground">
          Manage your services, bookings, and availability.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">
                My Services
              </p>
              <h2 className="mt-2 text-3xl font-bold">0</h2>
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
              <h2 className="mt-2 text-3xl font-bold">0</h2>
            </div>

            <ClipboardList className="h-9 w-9 text-primary" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">
                Active Jobs
              </p>
              <h2 className="mt-2 text-3xl font-bold">0</h2>
            </div>

            <Wrench className="h-9 w-9 text-primary" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">
                Completed Jobs
              </p>
              <h2 className="mt-2 text-3xl font-bold">0</h2>
            </div>

            <Calendar className="h-9 w-9 text-primary" />
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
              <Button> View Category </Button>
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
    <Button variant="outline">
      My Feedback ({reviewCount})
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

          <p className="text-muted-foreground">
            No bookings available.
          </p>
        </CardContent>
      </Card>

      {/* Recent Services */}
      <Card>
        <CardContent className="p-6">
          <h2 className="mb-4 text-xl font-semibold">
            Recent Services
          </h2>

          <p className="text-muted-foreground">
            No services found.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}