"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function BookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const serviceId = searchParams.get("serviceId");
  const slotId = searchParams.get("slotId");
  const technicianId = searchParams.get("technicianId");

  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!serviceId || !slotId) {
      alert("Missing booking information.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          credentials: "include",
          body: JSON.stringify({
            serviceId,
            slotId,
            address,
            note,
          }),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Booking failed");
      }

      alert("Booking created successfully!");

      router.push("/customer-dashboard");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto max-w-3xl py-10 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">
            Book Service
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleBooking}
            className="space-y-6"
          >
            <div className="space-y-4">
              <div>
                <Label>Service ID</Label>
                <Input
                  value={serviceId ?? ""}
                  disabled
                />
              </div>

              <div>
                <Label>Availability Slot ID</Label>
                <Input
                  value={slotId ?? ""}
                  disabled
                />
              </div>

              <div>
                <Label>Technician ID</Label>
                <Input
                  value={technicianId ?? ""}
                  disabled
                />
              </div>

              <div>
                <Label>Service Address</Label>
                <Input
                  placeholder="House 12, Road 5, Dhanmondi, Dhaka"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label>Note</Label>
                <Textarea
                  placeholder="Please call before arriving."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={5}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Booking..." : "Confirm Booking"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}