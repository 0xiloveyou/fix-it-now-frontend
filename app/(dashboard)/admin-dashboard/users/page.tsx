"use client";

import { useEffect, useState } from "react";
import {
  Loader2,
  Users,
  User,
  Mail,
  Phone,
  Shield,
  Eye,
  Ban,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface UserType {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  profileImage: string | null;
  role: "ADMIN" | "CUSTOMER" | "TECHNICIAN";
  status: "ACTIVE" | "BLOCKED";
  createdAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/admin/users`,
        {
          credentials: "include",
          cache: "no-store",
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      setUsers(result.data || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleStatus = async (
    id: string,
    currentStatus: string
  ) => {
    try {
      setUpdatingId(id);

      const newStatus =
        currentStatus === "ACTIVE"
          ? "BLOCKED"
          : "ACTIVE";

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/admin/users/${id}/status`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      toast.success("User status updated.");

      fetchUsers();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Update failed"
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const handleView = async (id: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/admin/users/${id}`,
        {
          credentials: "include",
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      const user = result.data;

      alert(
        `Name: ${user.name}

Email: ${user.email}

Phone: ${user.phone ?? "N/A"}

Role: ${user.role}

Status: ${user.status}

Created: ${new Date(
          user.createdAt
        ).toLocaleString()}`
      );
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed"
      );
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

      <div>
        <h1 className="text-3xl font-bold">
          Manage Users
        </h1>

        <p className="mt-2 text-muted-foreground">
          View all registered users and manage their status.
        </p>
      </div>

      {users.length === 0 ? (
        <Card>

          <CardContent className="flex flex-col items-center py-16">

            <Users className="mb-4 h-12 w-12 text-muted-foreground" />

            <h2 className="text-xl font-semibold">
              No Users Found
            </h2>

          </CardContent>

        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {users.map((user) => (

            <Card
              key={user.id}
              className="hover:shadow-lg transition"
            >

              <CardHeader>

                <CardTitle className="flex items-center gap-2">

                  <User className="h-5 w-5" />

                  {user.name}

                </CardTitle>

              </CardHeader>

              <CardContent className="space-y-3">

                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4" />
                  {user.email}
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4" />
                  {user.phone ?? "N/A"}
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4" />
                  Role: {user.role}
                </div>

                <div className="text-sm">
                  Status:{" "}
                  <span
                    className={
                      user.status === "ACTIVE"
                        ? "font-semibold text-green-600"
                        : "font-semibold text-red-600"
                    }
                  >
                    {user.status}
                  </span>
                </div>

                <div className="text-xs text-muted-foreground">
                  Joined:{" "}
                  {new Date(
                    user.createdAt
                  ).toLocaleDateString()}
                </div>

                <div className="flex gap-2 pt-3">

                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() =>
                      handleView(user.id)
                    }
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </Button>

                  <Button
                    className="flex-1"
                    variant={
                      user.status === "ACTIVE"
                        ? "destructive"
                        : "default"
                    }
                    disabled={updatingId === user.id}
                    onClick={() =>
                      handleStatus(
                        user.id,
                        user.status
                      )
                    }
                  >
                    {updatingId === user.id ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating
                      </>
                    ) : user.status === "ACTIVE" ? (
                      <>
                        <Ban className="mr-2 h-4 w-4" />
                        Block
                      </>
                    ) : (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Activate
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