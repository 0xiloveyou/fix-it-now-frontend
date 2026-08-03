"use client";

import Link from "next/link";
import { CheckCircle2, Home, CalendarCheck, Wrench } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PaymentSuccessPage() {
  return (
    <main className="container mx-auto flex min-h-[80vh] max-w-3xl items-center justify-center px-4 py-10">
      <Card className="w-full shadow-lg">
        <CardHeader className="flex flex-col items-center text-center">
          <div className="mb-6 rounded-full bg-green-100 p-5 dark:bg-green-900/20">
            <CheckCircle2 className="h-16 w-16 text-green-600" />
          </div>

          <CardTitle className="text-4xl font-bold text-green-600">
            Payment Successful!
          </CardTitle>

          <p className="mt-4 max-w-xl text-muted-foreground">
            Thank you for your payment. Your booking has been successfully
            confirmed and our technician will process your request shortly.
          </p>
        </CardHeader>

        <CardContent className="space-y-8">
          <div className="rounded-lg border bg-muted/40 p-6">
            <h2 className="mb-4 text-lg font-semibold">
              What happens next?
            </h2>

            <ul className="space-y-3 text-sm text-muted-foreground">
              <li> Your payment has been received successfully.</li>

              <li> Your booking is now confirmed.</li>

              <li>
                 You can monitor your booking status from the <strong>My
                Bookings</strong> page.
              </li>

              <li>
                 The technician will update the booking as work progresses.
              </li>
            </ul>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <Link
              href="/customer-dashboard/mybooking"
              className="w-full"
            >
              <Button className="w-full">
                <CalendarCheck className="mr-2 h-4 w-4" />
                My Bookings
              </Button>
            </Link>

            <Link href="/services" className="w-full">
              <Button
                variant="outline"
                className="w-full"
              >
                <Wrench className="mr-2 h-4 w-4" />
                Book Again
              </Button>
            </Link>

            <Link href="/" className="w-full">
              <Button
                variant="secondary"
                className="w-full"
              >
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}