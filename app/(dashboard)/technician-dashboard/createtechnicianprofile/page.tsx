"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { ArrowLeft, Loader2, UserCog } from "lucide-react";

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

export default function CreateTechnicianProfilePage() {
  const router = useRouter();

  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [experience, setExperience] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/technician/profile`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bio,
            location,
            hourlyRate: Number(hourlyRate),
            experience: Number(experience),
          }),
        }
      );


const data = await res.json();


     if (!res.ok) {
  if (data.message === "Technician profile already exist") {
    toast.info("You have already created your technician profile.");

    router.push("/technician-dashboard");
    return;
  }

  throw new Error(data.message || "Failed to create profile");
}

      toast.success("Technician profile created successfully.");

      router.push("/technician-dashboard");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong"
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
            Create Technician Profile
          </h1>

          <p className="mt-2 text-muted-foreground">
            Complete your technician profile before
            offering services.
          </p>
        </div>

        <Link href="/technician-dashboard">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>

      </div>

      <Card>

        <CardHeader>

          <CardTitle className="flex items-center gap-2">
            <UserCog className="h-5 w-5" />
            Profile Information
          </CardTitle>

          <CardDescription>
            Customers will see this information on
            your profile.
          </CardDescription>

        </CardHeader>

        <CardContent>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Bio
              </label>

              <Textarea
                rows={5}
                placeholder="Tell customers about yourself..."
                value={bio}
                onChange={(e) =>
                  setBio(e.target.value)
                }
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Location
              </label>

              <Input
                placeholder="Dhaka"
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value)
                }
                required
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Hourly Rate (৳)
                </label>

                <Input
                  type="number"
                  placeholder="2000"
                  value={hourlyRate}
                  onChange={(e) =>
                    setHourlyRate(e.target.value)
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Experience (Years)
                </label>

                <Input
                  type="number"
                  placeholder="1"
                  value={experience}
                  onChange={(e) =>
                    setExperience(e.target.value)
                  }
                  required
                />
              </div>

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
                  "Create Profile"
                )}
              </Button>

            </div>

          </form>

        </CardContent>

      </Card>

    </div>
  );
}