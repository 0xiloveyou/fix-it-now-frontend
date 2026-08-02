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
    location?: string;
    averageRating?: number;
  };
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // Filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchServices = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams();

      if (search) {
        params.append("searchTerm", search);
      }

      if (category) {
        params.append("category", category);
      }

      if (location) {
        params.append("location", location);
      }

      if (rating) {
        params.append("rating", rating);
      }

      if (priceMin) {
        params.append("priceMin", priceMin);
      }

      if (priceMax) {
        params.append("priceMax", priceMax);
      }

      params.append("page", page.toString());
      params.append("limit", "9");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/services?${params.toString()}`,
        {
          cache: "no-store",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to fetch services"
        );
      }

      setServices(result.data);

      setTotalPages(
        Math.ceil(result.meta.total / result.meta.limit)
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [
    search,
    category,
    location,
    rating,
    priceMin,
    priceMax,
    page,
  ]);

  if (loading) {
    return (
      <main className="container mx-auto py-10">
        <h2 className="text-2xl font-semibold">
          Loading services...
        </h2>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container mx-auto py-10">
        <h2 className="text-red-500">{error}</h2>
      </main>
    );
  }   return (
    <main className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">All Services</h1>

        <p className="mt-2 text-muted-foreground">
          Find trusted home service professionals.
        </p>
      </div>

      {/* Filters */}
      <Card className="mb-8">
        <CardContent className="grid gap-4 p-6 md:grid-cols-2 lg:grid-cols-3">
          <Input
            placeholder="Search service..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />

          <Input
            placeholder="Category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
          />

          <Input
            placeholder="Location"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              setPage(1);
            }}
          />

          <Input
            type="number"
            placeholder="Minimum Rating"
            value={rating}
            onChange={(e) => {
              setRating(e.target.value);
              setPage(1);
            }}
          />

          <Input
            type="number"
            placeholder="Minimum Price"
            value={priceMin}
            onChange={(e) => {
              setPriceMin(e.target.value);
              setPage(1);
            }}
          />

          <Input
            type="number"
            placeholder="Maximum Price"
            value={priceMax}
            onChange={(e) => {
              setPriceMax(e.target.value);
              setPage(1);
            }}
          />

          <Button
            variant="outline"
            onClick={() => {
              setSearch("");
              setCategory("");
              setLocation("");
              setRating("");
              setPriceMin("");
              setPriceMax("");
              setPage(1);
            }}
          >
            Clear Filters
          </Button>
        </CardContent>
      </Card>

      {services.length === 0 ? (
        <div className="py-20 text-center">
          <h2 className="text-2xl font-semibold">
            No services found.
          </h2>
        </div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Card
                key={service.id}
                className="transition-shadow hover:shadow-lg"
              >
                <CardContent className="space-y-4 p-6">
                  <div>
                    <h2 className="text-xl font-bold">
                      {service.title}
                    </h2>

                    <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                      {service.description}
                    </p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-semibold">
                        Category:
                      </span>{" "}
                      {service.category?.name ?? "N/A"}
                    </p>

                    <p>
                      <span className="font-semibold">
                        Technician:
                      </span>{" "}
                      {service.technician?.name ?? "N/A"}
                    </p>

                    <p>
                      <span className="font-semibold">
                        Location:
                      </span>{" "}
                      {service.technician?.location ??
                        "N/A"}
                    </p>

                    <p>
                      <span className="font-semibold">
                        Rating:
                      </span>{" "}
                      {service.technician?.averageRating ??
                        "N/A"}
                    </p>

                    <p>
                      <span className="font-semibold">
                        Duration:
                      </span>{" "}
                      {service.duration} Minutes
                    </p>

                    <p className="text-lg font-bold text-primary">
                      ৳ {service.price}
                    </p>
                  </div>

                  <Link
                    href={`/services/${service.id}`}
                    className="block"
                  >
                    <Button className="w-full">
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}

          <div className="mt-10 flex items-center justify-center gap-3">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Previous
            </Button>

            <span className="font-medium">
              Page {page} of {totalPages}
            </span>

            <Button
              variant="outline"
              disabled={page === totalPages}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </main>
  );
}