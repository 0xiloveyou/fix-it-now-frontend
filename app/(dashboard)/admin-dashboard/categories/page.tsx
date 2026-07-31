"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FolderTree,
  Plus,
  Loader2,
  Pencil,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Category {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/category`,
        {
          cache: "no-store",
          credentials: "include",
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      setCategories(result.data || []);
    } catch (error) {
      console.error(error);
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

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Categories
          </h1>

          <p className="mt-2 text-muted-foreground">
            Manage all service categories.
          </p>
        </div>

        <Link href="/admin-dashboard/createnewcategory">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Category
          </Button>
        </Link>

      </div>

      {categories.length === 0 ? (
        <Card>

          <CardContent className="flex flex-col items-center justify-center py-16">

            <FolderTree className="mb-4 h-12 w-12 text-muted-foreground" />

            <h2 className="text-xl font-semibold">
              No Categories Found
            </h2>

            <p className="mt-2 text-muted-foreground">
              Create your first category.
            </p>

            <Link
              href="/admin-dashboard/createnewcategory"
              className="mt-6"
            >
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Category
              </Button>
            </Link>

          </CardContent>

        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {categories.map((category) => (
            <Card
              key={category.id}
              className="transition hover:shadow-lg"
            >
              <CardHeader>

                <CardTitle className="flex items-center justify-between">

                  <span>{category.name}</span>

                  <FolderTree className="h-5 w-5 text-primary" />

                </CardTitle>

              </CardHeader>

              <CardContent>

                <p className="min-h-[48px] text-sm text-muted-foreground">
                  {category.description || "No description available."}
                </p>

                <div className="mt-6 flex items-center justify-between">

                  <span className="text-xs text-muted-foreground">
                    {new Date(
                      category.createdAt
                    ).toLocaleDateString()}
                  </span>

                  <Link
                    href={`/admin-dashboard/categories/${category.id}`}
                  >
                    <Button
                      size="sm"
                      variant="outline"
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      Manage
                    </Button>
                  </Link>

                </div>

              </CardContent>
            </Card>
          ))}

        </div>
      )}
    </div>
  );
}