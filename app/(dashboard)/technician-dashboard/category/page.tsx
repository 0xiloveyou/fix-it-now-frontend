"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FolderOpen, ArrowRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Category {
  id: string;
  name: string;
  description?: string;
}

export default function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/category`
    )
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.data || []);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex h-60 items-center justify-center">
        Loading categories...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Heading */}

      <div>
        <h1 className="text-3xl font-bold">
          Service Categories
        </h1>

        <p className="text-muted-foreground mt-2">
          Select a category before creating your service.
        </p>
      </div>

      {categories.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            No categories available.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="transition-all hover:shadow-lg"
            >
              <CardContent className="flex h-full flex-col p-6">
                <div className="mb-5 flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <FolderOpen className="h-7 w-7 text-primary" />
                  </div>

                  <h2 className="text-xl font-semibold">
                    {category.name}
                  </h2>
                </div>

                <p className="flex-1 text-sm text-muted-foreground">
                  {category.description ||
                    "No description available."}
                </p>

                <Link
                  href={`/technician-dashboard/createservice?categoryId=${category.id}&categoryName=${encodeURIComponent(
                    category.name
                  )}`}
                  className="mt-6"
                >
                  <Button className="w-full">
                    Create Service

                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}