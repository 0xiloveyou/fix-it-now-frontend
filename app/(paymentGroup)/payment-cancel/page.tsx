"use client";

import Link from "next/link";
import { XCircle, Home, CreditCard, Wrench } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PaymentCancelPage() {
  return (
    <main className="container mx-auto flex min-h-[80vh] max-w-3xl items-center justify-center px-4 py-10">
      <Card className="w-full shadow-lg">
        <CardHeader className="flex flex-col items-center text-center">
          <div className="mb-6 rounded-full bg-red-100 p-5 dark:bg-red-900/20">
            <XCircle className="h-16 w-16 text-red-600" />
          </div>

          <CardTitle className="text-4xl font-bold text-red-600">
            Payment Cancelled
          </CardTitle>

          <p className="mt-4 max-w-xl text-muted-foreground">
            Your payment was cancelled before it was completed. Do not worry—
            your booking has not been removed, and you can complete the payment
            whenever you are ready.
          </p>
        </CardHeader>

        <CardContent className="space-y-8">
          <div className="rounded-lg border bg-muted/40 p-6">
            <h2 className="mb-4 text-lg font-semibold">
              What can you do next?
            </h2>

            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>• Visit <strong>My Bookings</strong> to find your pending booking.</li>

              <li>• Complete the payment later whenever you are ready.</li>

              <li>• Browse more services if you want to make another booking.</li>

              <li>• Contact support if you experienced any payment issues.</li>
            </ul>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <Link
              href="/customer-dashboard/mybooking"
              className="w-full"
            >
              <Button className="w-full">
                <CreditCard className="mr-2 h-4 w-4" />
                My Bookings
              </Button>
            </Link>

            <Link href="/services" className="w-full">
              <Button
                variant="outline"
                className="w-full"
              >
                <Wrench className="mr-2 h-4 w-4" />
                Browse Services
              </Button>
            </Link>

            <Link href="/" className="w-full">
              <Button
                variant="secondary"
                className="w-full"
              >
                <Home className="mr-2 h-4 w-4" />
                Back Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}