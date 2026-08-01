"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  FolderPlus,
  Loader2,
} from "lucide-react";

import { toast } from "sonner";

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

export default function CreateCategoryPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/category`,
        {
          method: "POST",
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
        throw new Error(
          result.message || "Failed to create category"
        );
      }

      toast.success("Category created successfully.");

      router.push("/admin-dashboard/categories");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Create Category
          </h1>

          <p className="mt-2 text-muted-foreground">
            Add a new service category for technicians.
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
            <FolderPlus className="h-5 w-5" />
            Category Information
          </CardTitle>

          <CardDescription>
            Fill in all required category details.
          </CardDescription>

        </CardHeader>

        <CardContent>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <div className="space-y-2">

              <label className="text-sm font-medium">
                Category Name
              </label>

              <Input
                placeholder="AC Repair"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                required
              />

            </div>

            <div className="space-y-2">

              <label className="text-sm font-medium">
                Icon URL
              </label>

              <Input
                placeholder="https://cdn-icons-png.flaticon.com/..."
                value={icon}
                onChange={(e) =>
                  setIcon(e.target.value)
                }
                required
              />

            </div>

            {icon && (
              <div className="flex justify-center">

                <img
                  src={icon}
                  alt="Preview"
                  className="h-24 w-24 rounded-lg border object-contain p-2"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />

              </div>
            )}

            <div className="space-y-2">

              <label className="text-sm font-medium">
                Description
              </label>

              <Textarea
                rows={5}
                placeholder="Describe this category..."
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                required
              />

            </div>

            <div className="flex justify-end">

              <Button
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Category"
                )}
              </Button>

            </div>

          </form>

        </CardContent>

      </Card>

    </div>
  );
}