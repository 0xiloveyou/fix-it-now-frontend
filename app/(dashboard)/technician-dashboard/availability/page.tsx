"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Loader2,
  Trash2,
  CalendarDays,
} from "lucide-react";


interface Availability {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  status?: string;
}


export default function AvailabilityPage() {

  const API = process.env.NEXT_PUBLIC_BACKEND_API_URL;


  const [availability, setAvailability] =
    useState<Availability[]>([]);

  const [fetching, setFetching] =
    useState(true);

  const [loading, setLoading] =
    useState(false);


  const [formData, setFormData] = useState({
    date: "",
    startTime: "",
    endTime: "",
  });



  const fetchAvailability = async () => {

    try {

      setFetching(true);


      const res = await fetch(
        `${API}/api/availability/me`,
        {
          method: "GET",
          credentials: "include",
        }
      );


      const result = await res.json();


      if (!res.ok) {
        throw new Error(
          result.message || "Failed to fetch availability"
        );
      }


      setAvailability(
        result.data || []
      );


    } catch (error) {

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to load availability"
      );


    } finally {

      setFetching(false);

    }

  };




  useEffect(() => {

    const timeout = setTimeout(() => {
      fetchAvailability();
    }, 0);


    return () => {
      clearTimeout(timeout);
    };

  }, []);






  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();


    try {

      setLoading(true);


      const res = await fetch(
        `${API}/api/availability`,
        {
          method: "POST",
          credentials: "include",
          headers:{
            "Content-Type":"application/json",
          },
          body: JSON.stringify(formData),
        }
      );


      const result = await res.json();


      if(!res.ok){

        throw new Error(
          result.message || "Failed to create availability"
        );

      }



      toast.success(
        "Availability created successfully"
      );


      setFormData({
        date:"",
        startTime:"",
        endTime:"",
      });


      fetchAvailability();



    } catch(error){

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );


    } finally {

      setLoading(false);

    }

  };






  const deleteAvailability = async (
    id:string
  )=>{


    try{


      const res = await fetch(
        `${API}/api/availability/${id}`,
        {
          method:"DELETE",
          credentials:"include",
        }
      );


      const result = await res.json();



      if(!res.ok){

        throw new Error(
          result.message || "Delete failed"
        );

      }



      toast.success(
        "Availability deleted"
      );


      fetchAvailability();



    }catch(error){

      toast.error(
        error instanceof Error
          ? error.message
          : "Delete failed"
      );

    }


  };







  return (

    <div className="mx-auto max-w-5xl space-y-8">


      <div>

        <h1 className="text-3xl font-bold">
          Manage Availability
        </h1>


        <p className="text-muted-foreground mt-2">
          Set your available working hours for customers.
        </p>

      </div>






      {/* Create Availability */}


      <Card>

        <CardHeader>

          <CardTitle className="flex items-center gap-2">

            <CalendarDays className="h-5 w-5"/>

            Add Availability

          </CardTitle>

        </CardHeader>



        <CardContent>


          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >



            <div>

              <label className="text-sm font-medium">
                Date
              </label>


              <Input
                type="date"
                value={formData.date}
                onChange={(e)=>
                  setFormData({
                    ...formData,
                    date:e.target.value
                  })
                }
                required
              />

            </div>






            <div className="grid md:grid-cols-2 gap-5">


              <div>

                <label className="text-sm font-medium">
                  Start Time
                </label>


                <Input
                  type="time"
                  value={formData.startTime}
                  onChange={(e)=>
                    setFormData({
                      ...formData,
                      startTime:e.target.value
                    })
                  }
                  required
                />

              </div>




              <div>

                <label className="text-sm font-medium">
                  End Time
                </label>


                <Input
                  type="time"
                  value={formData.endTime}
                  onChange={(e)=>
                    setFormData({
                      ...formData,
                      endTime:e.target.value
                    })
                  }
                  required
                />


              </div>


            </div>





            <Button
              type="submit"
              disabled={loading}
            >

              {
                loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                    Saving...
                  </>
                ):(
                  "Add Availability"
                )
              }


            </Button>



          </form>


        </CardContent>


      </Card>









      {/* Availability List */}



      <Card>


        <CardHeader>

          <CardTitle>
            My Availability
          </CardTitle>

        </CardHeader>




        <CardContent>


          {
            fetching ? (

              <div className="flex justify-center">

                <Loader2 className="animate-spin"/>

              </div>


            ) : availability.length === 0 ? (

              <p className="text-muted-foreground">
                No availability added yet.
              </p>


            ) : (


              <div className="space-y-4">


                {
                  availability.map((item)=>(


                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >


                      <div>

                        <p className="font-semibold">
                          {item.date}
                        </p>


                        <p className="text-sm text-muted-foreground">

                          {item.startTime}
                          {" - "}
                          {item.endTime}

                        </p>


                      </div>





                      <Button

                        variant="destructive"

                        size="icon"

                        onClick={()=>
                          deleteAvailability(item.id)
                        }

                      >

                        <Trash2 className="h-4 w-4"/>

                      </Button>



                    </div>


                  ))
                }


              </div>


            )
          }


        </CardContent>


      </Card>



    </div>

  );

}