"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { CreditCard } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PaymentPage() {
  const params = useParams();

  const bookingId = params.bookingId as string;

  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/payments/checkout`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bookingId,
          }),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      window.location.href = result.data.checkoutUrl;
    } catch (error) {
      console.error(error);
      alert("Payment failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto max-w-xl py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">
            Checkout
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">

          <p>
            Booking ID
          </p>

          <div className="rounded border p-3 break-all">
            {bookingId}
          </div>

          <Button
            className="w-full"
            onClick={handleCheckout}
            disabled={loading}
          >
            <CreditCard className="mr-2 h-5 w-5" />

            {loading
              ? "Redirecting..."
              : "Proceed to Stripe"}
          </Button>

        </CardContent>
      </Card>
    </main>
  );
}