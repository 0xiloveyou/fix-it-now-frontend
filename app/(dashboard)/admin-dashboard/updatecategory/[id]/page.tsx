"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowLeft, Loader2, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function UpdateCategoryPage() {
  const { id } = useParams();

  const router = useRouter();

  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/category/${id}`,
        {
          credentials: "include",
          cache: "no-store",
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      setName(result.data.name || "");
      setIcon(result.data.icon || "");
      setDescription(result.data.description || "");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to load category"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setUpdating(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/category/${id}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            icon,
            description,
          }),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      toast.success("Category updated successfully");

      router.push("/admin-dashboard/categories");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Update failed"
      );
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Update Category
          </h1>

          <p className="mt-2 text-muted-foreground">
            Edit your service category information.
          </p>
        </div>

        <Link href="/admin-dashboard/categories">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Pencil className="h-5 w-5" />
            Category Details
          </CardTitle>

          <CardDescription>
            Update the category information below.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleUpdate}
            className="space-y-6"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Category Name
              </label>

              <Input
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="AC Repair"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Icon URL
              </label>

              <Input
                value={icon}
                onChange={(e) =>
                  setIcon(e.target.value)
                }
                placeholder="https://..."
              />
            </div>

            {icon && (
              <div className="rounded-lg border p-4">
                <img
                  src={icon}
                  alt="Category Icon"
                  className="h-20 w-20 object-contain"
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Description
              </label>

              <Textarea
                rows={5}
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                placeholder="Category description..."
              />
            </div>

            <div className="flex justify-end gap-3">
              <Link href="/admin-dashboard/categories">
                <Button variant="outline">
                  Cancel
                </Button>
              </Link>

              <Button
                type="submit"
                disabled={updating}
              >
                {updating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Category"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}