"use client";

import { useEffect, useState } from "react";
import {
  Star,
  User,
  Calendar,
  MessageSquare,
  Loader2,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

interface Review {
  id: string;
  rating: number;
  comment?: string;
  createdAt: string;

  customer: {
    id: string;
    name: string;
    email: string;
  };

  booking: {
    id: string;
    service: {
      title: string;
    };
  };
}



export default function MyFeedbackPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      // Get logged-in user
      const userRes = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/auth/user/me`,
        {
          credentials: "include",
        }
      );

      const userResult = await userRes.json();

      if (!userRes.ok) {
        throw new Error(userResult.message);
      }

      const technicianId = userResult.data.user.id;

      console.log("Technician User ID:", technicianId);

      // Fetch reviews
      const reviewRes = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/reviews/technician/${technicianId}`,
        {
          credentials: "include",
          cache: "no-store",
        }
      );

      const reviewResult = await reviewRes.json();

      console.log("Review Response:", reviewResult);
 
console.log("Review Response:", reviewResult);

      if (!reviewRes.ok) {
        throw new Error(reviewResult.message);
      }

      setReviews(reviewResult.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Customer Feedback
        </h1>

        <p className="mt-2 text-muted-foreground">
          See what customers say about your services.
        </p>
      </div>

      {reviews.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <MessageSquare className="mx-auto mb-5 h-12 w-12 text-muted-foreground" />

            <h2 className="text-2xl font-semibold">
              No Reviews Yet
            </h2>

            <p className="mt-3 text-muted-foreground">
              Customers have not reviewed your services yet.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>
                    {review.booking.service.title}
                  </CardTitle>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Booking ID: {review.booking.id}
                  </p>
                </div>

                <Badge className="text-base px-3 py-1">
                  ⭐ {review.rating}/5
                </Badge>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-6 w-6 ${
                        star <= review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                <div className="rounded-lg border bg-muted p-5">
                  <p className="leading-7">
                    {review.comment || "No comment provided."}
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />

                    <span>{review.customer.name}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />

                    <span>
                      {new Date(
                        review.createdAt
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}