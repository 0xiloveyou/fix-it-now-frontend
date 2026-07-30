"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
  };
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/services`,
          {
            cache: "no-store",
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to fetch services");
        }

        // Change this if your backend response structure differs.
        setServices(result.data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const filteredServices = services.filter((service) =>
    service.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <main className="container mx-auto py-10">
        <h2 className="text-2xl font-semibold">Loading services...</h2>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container mx-auto py-10">
        <h2 className="text-red-500">{error}</h2>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold">All Services</h1>
          <p className="text-muted-foreground mt-2">
            Find trusted home service professionals.
          </p>
        </div>

        <Input
          placeholder="Search service..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-80"
        />
      </div>

      {filteredServices.length === 0 ? (
        <div className="py-20 text-center">
          <h2 className="text-2xl font-semibold">
            No services found.
          </h2>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service) => (
            <Card key={service.id}>
              <CardContent className="space-y-4 p-6">
                <div>
                  <h2 className="text-xl font-bold">
                    {service.title}
                  </h2>

                  <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                    {service.description}
                  </p>
                </div>

                <div className="space-y-1 text-sm">
                  <p>
                    <span className="font-semibold">Category:</span>{" "}
                    {service.category?.name ?? "N/A"}
                  </p>

                  <p>
                    <span className="font-semibold">Technician:</span>{" "}
                    {service.technician?.name ?? "N/A"}
                  </p>

                  <p>
                    <span className="font-semibold">Duration:</span>{" "}
                    {service.duration} min
                  </p>

                  <p className="text-lg font-bold text-primary">
                    ৳ {service.price}
                  </p>
                </div>

                 <Link href={`/services/${service.id}`} className="block">
                  <Button className="w-full">
                    View Details
                  </Button>
                 </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}