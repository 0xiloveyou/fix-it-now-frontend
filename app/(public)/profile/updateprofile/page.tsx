"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Loader2,
  Save,
  User,
  Phone,
  Image as ImageIcon,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  profileImage: string | null;
  role: string;
  status: string;
}

export default function UpdateProfilePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    profileImage: "",
  });

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/auth/user/me`,
        {
          credentials: "include",
          cache: "no-store",
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      const user: UserProfile = result.data.user;

      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        profileImage: user.profileImage || "",
      });

      setEmail(user.email);
      setRole(user.role);
      setStatus(user.status);
    } catch (error) {
      console.error(error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to load profile."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/auth/user/me`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            phone: formData.phone,
            profileImage: formData.profileImage,
          }),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      toast.success("Profile updated successfully.");

      router.push("/profile");
      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update profile."
      );
    } finally {
      setSubmitting(false);
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
    <div className="mx-auto max-w-3xl space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          Update Profile
        </h1>

        <p className="mt-2 text-muted-foreground">
          Update your personal information.
        </p>
      </div>

      <Card>

        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
        </CardHeader>

        <CardContent>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <div className="space-y-2">
              <Label>Name</Label>

              <div className="relative">
                <User className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />

                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Email</Label>

              <Input
                value={email}
                disabled
              />
            </div>

            <div className="space-y-2">
              <Label>Phone</Label>

              <div className="relative">
                <Phone className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />

                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Profile Image URL</Label>

              <div className="relative">
                <ImageIcon className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />

                <Input
                  name="profileImage"
                  value={formData.profileImage}
                  onChange={handleChange}
                  className="pl-10"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            {formData.profileImage && (
              <div className="flex justify-center">
                <img
                  src={formData.profileImage}
                  alt="Preview"
                  className="h-36 w-36 rounded-full border object-cover"
                />
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-2">

              <div className="space-y-2">
                <Label>Role</Label>

                <Input
                  value={role}
                  disabled
                />
              </div>

              <div className="space-y-2">
                <Label>Status</Label>

                <Input
                  value={status}
                  disabled
                />
              </div>

            </div>

            <div className="flex gap-4">

              <Button
                type="submit"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Update Profile
                  </>
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/profile")}
              >
                Cancel
              </Button>

            </div>

          </form>

        </CardContent>

      </Card>

    </div>
  );
}