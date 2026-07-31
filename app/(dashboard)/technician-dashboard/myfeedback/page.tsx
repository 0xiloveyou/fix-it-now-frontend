"use client";

import { useEffect, useState } from "react";
import { Star, User, Calendar, MessageSquare } from "lucide-react";

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
      // Replace with your logged-in technician id
      const technicianId = "YOUR_TECHNICIAN_ID";

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/reviews/technician/${technicianId}`,
        {
          credentials: "include",
          cache: "no-store",
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      setReviews(result.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center">
        Loading feedback...
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
          <CardContent className="py-12 text-center">
            <MessageSquare className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />

            <h2 className="text-xl font-semibold">
              No Reviews Yet
            </h2>

            <p className="mt-2 text-muted-foreground">
              Once customers review your completed jobs,
              they will appear here.
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

                <Badge variant="secondary">
                  {review.rating} / 5 ⭐
                </Badge>

              </CardHeader>

              <CardContent className="space-y-5">

                <div className="flex items-center gap-2">

                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}

                </div>

                <p className="rounded-lg bg-muted p-4 leading-7">
                  {review.comment || "No comment"}
                </p>

                <div className="grid gap-3 md:grid-cols-2">

                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />

                    <span>
                      {review.customer.name}
                    </span>
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