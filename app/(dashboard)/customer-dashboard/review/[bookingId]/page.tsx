"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, Star } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";


export default function ReviewPage() {

  const params = useParams();

  const router = useRouter();

  const searchParams = useSearchParams();


  const bookingId = params.bookingId as string;

  const service =
    searchParams.get("service") || "";



  const [rating,setRating] = useState(5);

  const [comment,setComment] = useState("");

  const [loading,setLoading] = useState(false);




  const submitReview = async()=>{


    try{

      setLoading(true);


      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/reviews`,
        {
          method:"POST",
          credentials:"include",

          headers:{
            "Content-Type":"application/json",
          },

          body:JSON.stringify({

            bookingId,

            rating,

            comment,

          }),

        }
      );



      const data = await res.json();


      if (!res.ok) {
  if (data.message === "You have already reviewed this booking.") {
    toast.info("You have already reviewed this booking.");

    router.push("/customer-dashboard/mybooking");

    return;
  }

  throw new Error(data.message || "Review failed");
}


      toast.success(
        "Review submitted successfully"
      );


      router.push(
        "/customer-dashboard/mybooking"
      ); 



    }catch(error){

      toast.error(
        error instanceof Error
        ? error.message
        : "Something went wrong"
      );


    }finally{

      setLoading(false);

    }


  };





  return (
  <div className="mx-auto max-w-3xl py-10 px-4">
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">Leave a Review</h1>
        <p className="mt-2 text-muted-foreground">
          Share your experience to help other customers.
        </p>
      </div>

      <Link href="/customer-dashboard/mybooking">
        <Button variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </Link>
    </div>

    <Card className="shadow-lg border-0">
      <CardHeader className="border-b">
        <CardTitle className="text-2xl">
          {service}
        </CardTitle>

        <p className="text-sm text-muted-foreground">
          Booking ID: {bookingId}
        </p>
      </CardHeader>

      <CardContent className="space-y-8 pt-8">
        <div className="text-center">
          <p className="mb-5 text-lg font-semibold">
            How was your experience?
          </p>

          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="transition hover:scale-125"
              >
                <Star
                  className={`h-10 w-10 ${
                    rating >= star
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>

          <p className="mt-4 text-muted-foreground">
            {rating === 1 && "Very Poor 😞"}
            {rating === 2 && "Poor 😕"}
            {rating === 3 && "Average 🙂"}
            {rating === 4 && "Good 😊"}
            {rating === 5 && "Excellent 🤩"}
          </p>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Your Review
          </label>

          <Textarea
            rows={6}
            placeholder="Tell others about your experience with this technician..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-4">
          <Link href="/customer-dashboard/mybooking">
            <Button variant="outline">
              Cancel
            </Button>
          </Link>

          <Button
            size="lg"
            disabled={loading || comment.trim().length < 10}
            onClick={submitReview}
          >
            {loading ? "Submitting..." : "Submit Review"}
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
);
}