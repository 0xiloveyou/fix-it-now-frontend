"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FolderTree,
  Plus,
  Loader2,
  Pencil,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

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
  icon?: string;
  description?: string;
  createdAt: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/category`,
        {
          credentials: "include",
          cache: "no-store",
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      setCategories(result.data || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmDelete) return;

    try {
      setDeletingId(id);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/category/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      setCategories((prev) =>
        prev.filter((category) => category.id !== id)
      );

      toast.success("Category deleted successfully.");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Delete failed."
      );
    } finally {
      setDeletingId(null);
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
              className="transition-all hover:shadow-xl"
            >

              <CardHeader>

                <CardTitle className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    {category.icon && (
                      <img
                        src={category.icon}
                        alt={category.name}
                        className="h-10 w-10 rounded-lg border p-1 object-contain"
                      />
                    )}

                    <span>{category.name}</span>

                  </div>

                  <FolderTree className="h-5 w-5 text-primary" />

                </CardTitle>

              </CardHeader>

              <CardContent>

                <p className="min-h-[60px] text-sm text-muted-foreground">
                  {category.description ||
                    "No description available."}
                </p>

                <p className="mt-4 text-xs text-muted-foreground">
                  Created:{" "}
                  {new Date(
                    category.createdAt
                  ).toLocaleDateString()}
                </p>

                <div className="mt-6 flex gap-3">

                  <Link
                    href={`/admin-dashboard/updatecategory/${category.id}`}
                    className="flex-1"
                  >
                    <Button
                      variant="outline"
                      className="w-full"
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      Update
                    </Button>
                  </Link>

                  <Button
                    variant="destructive"
                    className="flex-1"
                    disabled={deletingId === category.id}
                    onClick={() =>
                      handleDelete(category.id)
                    }
                  >
                    {deletingId === category.id ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      <>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </>
                    )}
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