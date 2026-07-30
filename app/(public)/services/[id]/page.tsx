"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Availability {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
}

interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: number;

  category?: {
    id: string;
    name: string;
  };

  technician?: {
    id: string;
    name: string;
    email?: string;
    phone?: string;
  };
}

export default function ServiceDetailsPage() {
  const params = useParams();

  const [service, setService] = useState<Service | null>(null);
  const [technicianId, setTechnicianId] = useState("");
  const [availability, setAvailability] = useState<Availability[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        // Fetch Service Details
        const serviceRes = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/services/${params.id}`,
          {
            cache: "no-store",
          }
        );

        const serviceResult = await serviceRes.json();

        if (!serviceRes.ok) {
          throw new Error(serviceResult.message);
        }

        setService(serviceResult.data);

        // Fetch Technician ID using Service ID
        const techRes = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/services/getTechnician/${params.id}`
        );

        const techResult = await techRes.json();

        if (!techRes.ok) {
          throw new Error(techResult.message);
        }

        const techId = techResult.data.technicianId;
        setTechnicianId(techId);

        // Fetch Technician Availability
        const slotRes = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/availability/technician/${techId}`
        );

        const slotResult = await slotRes.json();

        if (slotRes.ok) {
          setAvailability(slotResult.data || []);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchService();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="container mx-auto py-16">
        <h2 className="text-2xl font-semibold">
          Loading service...
        </h2>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="container mx-auto py-16">
        <h2 className="text-2xl font-semibold">
          Service not found.
        </h2>
      </div>
    );
  }

  return (
    <main className="container mx-auto max-w-5xl py-10 px-4">
      <Link href="/services">
        <Button variant="outline" className="mb-6">
          ← Back
        </Button>
      </Link>

      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">
            {service.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Description */}
          <div>
            <h3 className="font-semibold mb-2">
              Description
            </h3>

            <p className="text-muted-foreground">
              {service.description}
            </p>
          </div>

          {/* Service Info */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardContent className="p-5 space-y-2">
                <h3 className="font-semibold">
                  Service Information
                </h3>

                <p>
                  <strong>Category:</strong>{" "}
                  {service.category?.name ?? "N/A"}
                </p>

                <p>
                  <strong>Price:</strong> ৳{service.price}
                </p>

                <p>
                  <strong>Duration:</strong>{" "}
                  {service.duration} Minutes
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5 space-y-2">
                <h3 className="font-semibold">
                  Technician
                </h3>

                <p>
                  <strong>Name:</strong>{" "}
                  {service.technician?.name ?? "N/A"}
                </p>

                <p>
                  <strong>Email:</strong>{" "}
                  {service.technician?.email ??
                    "Not available"}
                </p>

                <p>
                  <strong>Phone:</strong>{" "}
                  {service.technician?.phone ??
                    "Not available"}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Availability */}
          <Card>
            <CardHeader>
              <CardTitle>
                Available Time Slots
              </CardTitle>
            </CardHeader>

            <CardContent>
              {availability.length === 0 ? (
                <p className="text-muted-foreground">
                  No available slots.
                </p>
              ) : (
                <div className="space-y-3">
                  {availability.map((slot) => (
                    <div
                      key={slot.id}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div>
                        <p className="font-medium">
                          {slot.date}
                        </p>

                        <p className="text-sm text-muted-foreground">
                          {slot.startTime} - {slot.endTime}
                        </p>

                        <p className="text-sm">
                          Status: {slot.status}
                        </p>
                      </div>

                      <Link
                        href={`/customer-dashboard/booking?serviceId=${service.id}&slotId=${slot.id}&technicianId=${technicianId}`}
                      >
                        <Button>
                          Book Now
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </main>
  );
}