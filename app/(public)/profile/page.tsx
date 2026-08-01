"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Loader2,
  User,
  Mail,
  Phone,
  Shield,
  Calendar,
  Image as ImageIcon,
  Edit,
} from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  profileImage: string | null;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

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

      setUser(result.data.user);
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

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        User not found.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            My Profile
          </h1>

          <p className="mt-2 text-muted-foreground">
            View your account information.
          </p>

        </div>

        <Link href="/profile/updateprofile">
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            Update Profile
          </Button>
        </Link>

      </div>

      <Card>

        <CardHeader>

          <CardTitle>
            Profile Information
          </CardTitle>

        </CardHeader>

        <CardContent>

          <div className="flex flex-col items-center gap-6 md:flex-row">

            {user.profileImage ? (
              <Image
                src={user.profileImage}
                alt={user.name}
               width={150}
  height={150}
                className="h-36 w-36 rounded-full border object-cover"
              />
            ) : (
              <div className="flex h-36 w-36 items-center justify-center rounded-full bg-muted">
                <ImageIcon className="h-12 w-12 text-muted-foreground" />
              </div>
            )}

            <div className="grid flex-1 gap-5 md:grid-cols-2">

              <div>
                <p className="mb-1 flex items-center gap-2 font-semibold">
                  <User className="h-4 w-4" />
                  Name
                </p>

                <p className="text-muted-foreground">
                  {user.name}
                </p>
              </div>

              <div>
                <p className="mb-1 flex items-center gap-2 font-semibold">
                  <Mail className="h-4 w-4" />
                  Email
                </p>

                <p className="text-muted-foreground">
                  {user.email}
                </p>
              </div>

              <div>
                <p className="mb-1 flex items-center gap-2 font-semibold">
                  <Phone className="h-4 w-4" />
                  Phone
                </p>

                <p className="text-muted-foreground">
                  {user.phone || "N/A"}
                </p>
              </div>

              <div>
                <p className="mb-1 flex items-center gap-2 font-semibold">
                  <Shield className="h-4 w-4" />
                  Role
                </p>

                <p className="text-muted-foreground">
                  {user.role}
                </p>
              </div>

              <div>
                <p className="mb-1 flex items-center gap-2 font-semibold">
                  <Shield className="h-4 w-4" />
                  Status
                </p>

                <span
                  className={`rounded px-3 py-1 text-sm font-medium ${
                    user.status === "ACTIVE"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {user.status}
                </span>
              </div>

              <div>
                <p className="mb-1 flex items-center gap-2 font-semibold">
                  <Calendar className="h-4 w-4" />
                  Joined
                </p>

                <p className="text-muted-foreground">
                  {new Date(
                    user.createdAt
                  ).toLocaleDateString()}
                </p>
              </div>

              <div>
                <p className="mb-1 flex items-center gap-2 font-semibold">
                  <Calendar className="h-4 w-4" />
                  Last Updated
                </p>

                <p className="text-muted-foreground">
                  {new Date(
                    user.updatedAt
                  ).toLocaleString()}
                </p>
              </div>

              <div className="md:col-span-2">
                <p className="mb-1 font-semibold">
                  Profile Image URL
                </p>

                <p className="break-all text-muted-foreground">
                  {user.profileImage || "No profile image"}
                </p>
              </div>

            </div>

          </div>

        </CardContent>

      </Card>

    </div>
  );
}