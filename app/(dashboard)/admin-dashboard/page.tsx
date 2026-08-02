"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  UserCog,
  Shield,
  User,
  Loader2,
  ArrowRight,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "CUSTOMER" | "TECHNICIAN";
  status: "ACTIVE" | "BLOCKED";
  createdAt: string;
}

export default function AdminDashboardPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
 const [currentPage, setCurrentPage] = useState(1);

const usersPerPage = 5;
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
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
    } finally {
      setLoading(false);
    }
  };

  const totalUsers = users.length;
  const totalCustomers = users.filter(
    (u) => u.role === "CUSTOMER"
  ).length;

  const totalTechnicians = users.filter(
    (u) => u.role === "TECHNICIAN"
  ).length;

  const totalAdmins = users.filter(
    (u) => u.role === "ADMIN"
  ).length;

  const totalPages = Math.ceil(
  users.length / usersPerPage
);

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage users, technicians and monitor the platform.
        </p>
      </div>

      {/* Statistics */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">
                Total Users
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {totalUsers}
              </h2>
            </div>

            <Users className="h-10 w-10 text-primary" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">
                Customers
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {totalCustomers}
              </h2>
            </div>

            <User className="h-10 w-10 text-primary" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">
                Technicians
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {totalTechnicians}
              </h2>
            </div>

            <UserCog className="h-10 w-10 text-primary" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">
                Admins
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {totalAdmins}
              </h2>
            </div>

            <Shield className="h-10 w-10 text-primary" />
          </CardContent>
        </Card>

      </div>

      {/* Quick Actions */}

      <Card>
        <CardContent className="p-6">

          <h2 className="mb-5 text-xl font-semibold">
            Quick Actions
          </h2>

          <div className="flex flex-wrap gap-4">

            <Link href="/admin-dashboard/users">
              <Button>
                Manage Users
              </Button>
            </Link>

            <Link href="/admin-dashboard/categories">
              <Button variant="outline">
                Categories
              </Button>
            </Link>

            <Link href="/admin-dashboard/services">
              <Button variant="outline">
                Services
              </Button>
            </Link>

            <Link href="/admin-dashboard/bookings">
              <Button variant="outline">
                Bookings
              </Button>
            </Link>

          </div>

        </CardContent>
      </Card>

      {/* Recent Users */}

      <Card>

        <CardContent className="p-6">

          <div className="mb-6 flex items-center justify-between">

            <h2 className="text-xl font-semibold">
              Recent Users
            </h2>

            <Link href="/admin-dashboard/users">

              <Button variant="ghost">

                View All

                <ArrowRight className="ml-2 h-4 w-4" />

              </Button>

            </Link>

          </div>

          {users.length === 0 ? (
            <p className="text-muted-foreground">
              No users found.
            </p>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="border-b">

                    <th className="py-3 text-left">
                      Name
                    </th>

                    <th className="py-3 text-left">
                      Email
                    </th>

                    <th className="py-3 text-left">
                      Role
                    </th>

                    <th className="py-3 text-left">
                      Status
                    </th>

                    <th className="py-3 text-left">
                      Joined
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {users
  .slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  )
  .map((user) => (

                    <tr
                      key={user.id}
                      className="border-b"
                    >

                      <td className="py-4">
                        {user.name}
                      </td>

                      <td>
                        {user.email}
                      </td>

                      <td>
                        {user.role}
                      </td>

                      <td>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            user.status === "ACTIVE"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {user.status}
                        </span>

                      </td>

                      <td>
                        {new Date(
                          user.createdAt
                        ).toLocaleDateString()}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>
              <div className="mt-6 flex items-center justify-between">
  <p className="text-sm text-muted-foreground">
    Showing{" "}
    {Math.min(
      (currentPage - 1) * usersPerPage + 1,
      users.length
    )}{" "}
    -
    {" "}
    {Math.min(
      currentPage * usersPerPage,
      users.length
    )}{" "}
    of {users.length} users
  </p>

  <div className="flex gap-2">
    <Button
      variant="outline"
      size="sm"
      disabled={currentPage === 1}
      onClick={() =>
        setCurrentPage((prev) => prev - 1)
      }
    >
      Previous
    </Button>

    <Button
      variant="outline"
      size="sm"
      disabled={currentPage === totalPages}
      onClick={() =>
        setCurrentPage((prev) => prev + 1)
      }
    >
      Next
    </Button>
  </div>
</div>
            </div>
          )}

        </CardContent>

      </Card>

    </div>
  );
}