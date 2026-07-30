"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  getMyServices,
  deleteService,
} from "../../_actions/serviceAction";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: number;
}

export default function MyServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      const result = await getMyServices();

      if (result.success) {
        setServices(result.data);
      } else {
        alert(result.message);
      }

      setLoading(false);
    };

    loadServices();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this service?")) return;

    const result = await deleteService(id);

    if (result.success) {
      setServices((prev) =>
        prev.filter((service) => service.id !== id)
      );
    } else {
      alert(result.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            My Services
          </h1>

          <p className="text-muted-foreground">
            Manage your services
          </p>
        </div>

        <Link href="/technician-dashboard/services/create">
          <Button>Create Service</Button>
        </Link>
      </div>

      {services.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            No services found.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {services.map((service) => (
            <Card key={service.id}>
              <CardHeader>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <p>{service.description}</p>

                <div className="flex justify-between">
                  <span>৳ {service.price}</span>

                  <span>{service.duration} mins</span>
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/services/${service.id}`}
                  >
                    <Button variant="outline">
                      View
                    </Button>
                  </Link>

                  <Button
                    variant="destructive"
                    onClick={() =>
                      handleDelete(service.id)
                    }
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}