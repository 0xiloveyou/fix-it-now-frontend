"use client";

import Link from "next/link";
import {
  CalendarCheck,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

export default function CustomerDashboardPage() {
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
                0
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
                0
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
                0
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
                0
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

            <Link href="/customer-dashboard/bookings">
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
          <h2 className="text-xl font-semibold mb-4">
            Recent Bookings
          </h2>

          <p className="text-muted-foreground">
            You do not have any bookings yet.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}