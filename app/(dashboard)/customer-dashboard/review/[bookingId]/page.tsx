"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

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

console.log("Status:", res.status);
console.log("Response:", data);

      if(!res.ok){

        throw new Error(
          data.message || "Review failed"
        );

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

    <div className="mx-auto max-w-xl py-10">


      <Card>


        <CardHeader>

          <CardTitle>
            Review {service}
          </CardTitle>

        </CardHeader>



        <CardContent className="space-y-6">


          <div>

            <p className="font-medium mb-2">
              Rating
            </p>


            <div className="flex gap-2">


              {[1,2,3,4,5].map((star)=>(

                <button

                  key={star}

                  type="button"

                  onClick={()=>
                    setRating(star)
                  }

                  className={`text-3xl ${
                    rating >= star
                    ? "text-yellow-500"
                    : "text-gray-300"
                  }`}

                >
                  ★
                </button>


              ))}


            </div>


          </div>




          <Textarea

            placeholder="Write your experience..."

            value={comment}

            onChange={(e)=>
              setComment(e.target.value)
            }

            rows={5}

          />




          <Button

            onClick={submitReview}

            disabled={loading}

          >

            {
              loading
              ? "Submitting..."
              : "Submit Review"
            }


          </Button>



        </CardContent>


      </Card>


    </div>

  );
}