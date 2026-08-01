"use client";

import { useEffect, useState } from "react";
import {
  Loader2,
  Calendar,
  User,
  Wrench,
  Eye,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

interface Booking {
  id: string;
  address: string;
  note: string;
  totalPrice: number;
  status: string;
  createdAt: string;

  customer: {
    id: string;
    name: string;
    email: string;
  };

  technician: {
    id: string;
    name: string;
    email: string;
  };

  service: {
    id: string;
    title: string;
    category: {
      name: string;
    };
  };

  slot: {
    date: string;
    startTime: string;
    endTime: string;
  };

  payment: {
    status: string;
  } | null;
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedBooking, setSelectedBooking] =
    useState<Booking | null>(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/bookings`,
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

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to load bookings."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold">
          Manage Bookings
        </h1>

        <p className="mt-2 text-muted-foreground">
          View every booking created in the system.
        </p>

      </div>

      <Card>

        <CardHeader>

          <CardTitle>
            All Bookings ({bookings.length})
          </CardTitle>

        </CardHeader>

        <CardContent>

          {bookings.length === 0 ? (

            <div className="py-16 text-center text-muted-foreground">
              No bookings found.
            </div>

          ) : (

            <Table>

              <TableHeader>

                <TableRow>

                  <TableHead>Service</TableHead>

                  <TableHead>Customer</TableHead>

                  <TableHead>Technician</TableHead>

                  <TableHead>Price</TableHead>

                  <TableHead>Status</TableHead>

                  <TableHead>Payment</TableHead>

                  <TableHead>Date</TableHead>

                  <TableHead className="text-right">
                    Action
                  </TableHead>

                </TableRow>

              </TableHeader>

              <TableBody>

                {bookings.map((booking) => (

                  <TableRow key={booking.id}>

                    <TableCell>
                      <div className="font-medium">
                        {booking.service.title}
                      </div>

                      <div className="text-xs text-muted-foreground">
                        {booking.service.category.name}
                      </div>
                    </TableCell>

                    <TableCell>

                      <div className="flex items-center gap-2">

                        <User className="h-4 w-4" />

                        {booking.customer.name}

                      </div>

                    </TableCell>

                    <TableCell>

                      <div className="flex items-center gap-2">

                        <Wrench className="h-4 w-4" />

                        {booking.technician.name}

                      </div>

                    </TableCell>

                    <TableCell>
                      ৳{booking.totalPrice}
                    </TableCell>

                    <TableCell>

                      <Badge
                        variant={
                          booking.status === "COMPLETED"
                            ? "default"
                            : booking.status === "REQUESTED"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {booking.status}
                      </Badge>

                    </TableCell>

                    <TableCell>

                      <Badge
                        variant={
                          booking.payment?.status ===
                          "COMPLETED"
                            ? "default"
                            : "destructive"
                        }
                      >
                        {booking.payment?.status ??
                          "UNPAID"}
                      </Badge>

                    </TableCell>

                    <TableCell>

                      <div className="flex items-center gap-2">

                        <Calendar className="h-4 w-4" />

                        {new Date(
                          booking.slot.date
                        ).toLocaleDateString()}

                      </div>

                    </TableCell>

                    <TableCell className="text-right">

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          setSelectedBooking(
                            booking
                          )
                        }
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>

                    </TableCell>

                  </TableRow>

                ))}
                              </TableBody>

            </Table>

          )}

        </CardContent>

      </Card>

      {selectedBooking && (

        <Card>

          <CardHeader>

            <CardTitle>
              Booking Details
            </CardTitle>

          </CardHeader>

          <CardContent className="space-y-6">

            <div className="grid gap-6 md:grid-cols-2">

              <div>
                <p className="font-semibold">
                  Booking ID
                </p>

                <p className="text-sm text-muted-foreground break-all">
                  {selectedBooking.id}
                </p>
              </div>

              <div>
                <p className="font-semibold">
                  Address
                </p>

                <p className="text-sm text-muted-foreground">
                  {selectedBooking.address}
                </p>
              </div>

              <div>
                <p className="font-semibold">
                  Customer
                </p>

                <p className="text-sm text-muted-foreground">
                  {selectedBooking.customer.name}
                </p>

                <p className="text-sm text-muted-foreground">
                  {selectedBooking.customer.email}
                </p>
              </div>

              <div>
                <p className="font-semibold">
                  Technician
                </p>

                <p className="text-sm text-muted-foreground">
                  {selectedBooking.technician.name}
                </p>

                <p className="text-sm text-muted-foreground">
                  {selectedBooking.technician.email}
                </p>
              </div>

              <div>
                <p className="font-semibold">
                  Service
                </p>

                <p className="text-sm text-muted-foreground">
                  {selectedBooking.service.title}
                </p>
              </div>

              <div>
                <p className="font-semibold">
                  Category
                </p>

                <p className="text-sm text-muted-foreground">
                  {selectedBooking.service.category.name}
                </p>
              </div>

              <div>
                <p className="font-semibold">
                  Booking Status
                </p>

                <Badge className="mt-2">
                  {selectedBooking.status}
                </Badge>
              </div>

              <div>
                <p className="font-semibold">
                  Payment Status
                </p>

                <Badge
                  className="mt-2"
                  variant={
                    selectedBooking.payment?.status ===
                    "COMPLETED"
                      ? "default"
                      : "destructive"
                  }
                >
                  {selectedBooking.payment?.status ??
                    "UNPAID"}
                </Badge>
              </div>

              <div>
                <p className="font-semibold">
                  Price
                </p>

                <p className="text-sm text-muted-foreground">
                  ৳{selectedBooking.totalPrice}
                </p>
              </div>

              <div>
                <p className="font-semibold">
                  Service Date
                </p>

                <p className="text-sm text-muted-foreground">
                  {new Date(
                    selectedBooking.slot.date
                  ).toLocaleDateString()}
                </p>
              </div>

              <div>
                <p className="font-semibold">
                  Time
                </p>

                <p className="text-sm text-muted-foreground">
                  {selectedBooking.slot.startTime} -{" "}
                  {selectedBooking.slot.endTime}
                </p>
              </div>

              <div>
                <p className="font-semibold">
                  Created At
                </p>

                <p className="text-sm text-muted-foreground">
                  {new Date(
                    selectedBooking.createdAt
                  ).toLocaleString()}
                </p>
              </div>

            </div>

            <div>

              <p className="font-semibold mb-2">
                Customer Note
              </p>

              <div className="rounded-md border p-4 text-sm text-muted-foreground">
                {selectedBooking.note || "No note provided."}
              </div>

            </div>

            <div className="flex justify-end">

              <Button
                variant="outline"
                onClick={() =>
                  setSelectedBooking(null)
                }
              >
                Close
              </Button>

            </div>

          </CardContent>

        </Card>

      )}

    </div>
  );
}