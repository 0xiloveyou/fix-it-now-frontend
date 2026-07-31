"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";


export default function ContactPage() {

  const [loading, setLoading] = useState(false);


  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault();

    setLoading(true);


    // connect your backend contact API later

    setTimeout(() => {

      toast.success(
        "Message sent successfully!"
      );

      setLoading(false);

      e.currentTarget.reset();

    }, 1000);

  };



  return (

    <div className="mx-auto max-w-6xl space-y-10 p-6">


      <div className="text-center">

        <h1 className="text-4xl font-bold">
          Contact Us
        </h1>

        <p className="mt-3 text-muted-foreground">
          Have questions? We are here to help you.
        </p>

      </div>




      <div className="grid gap-8 md:grid-cols-2">


        {/* Contact Info */}

        <Card>

          <CardHeader>

            <CardTitle>
              Get In Touch
            </CardTitle>

          </CardHeader>


          <CardContent className="space-y-6">


            <div className="flex gap-4">

              <Mail className="h-5 w-5"/>

              <div>
                <p className="font-medium">
                  Email
                </p>

                <p className="text-muted-foreground">
                  support@fixitnow.com
                </p>
              </div>

            </div>




            <div className="flex gap-4">

              <Phone className="h-5 w-5"/>

              <div>

                <p className="font-medium">
                  Phone
                </p>

                <p className="text-muted-foreground">
                  +880 1234-567890
                </p>

              </div>

            </div>




            <div className="flex gap-4">

              <MapPin className="h-5 w-5"/>

              <div>

                <p className="font-medium">
                  Address
                </p>

                <p className="text-muted-foreground">
                  Dhaka, Bangladesh
                </p>

              </div>

            </div>


          </CardContent>

        </Card>






        {/* Form */}


        <Card>


          <CardHeader>

            <CardTitle>
              Send Message
            </CardTitle>

          </CardHeader>



          <CardContent>


            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >


              <Input
                placeholder="Your Name"
                required
              />


              <Input
                type="email"
                placeholder="Your Email"
                required
              />


              <Textarea
                placeholder="Your Message"
                rows={5}
                required
              />



              <Button
                type="submit"
                disabled={loading}
              >

                {
                  loading
                  ? "Sending..."
                  : "Send Message"
                }

              </Button>


            </form>


          </CardContent>


        </Card>



      </div>


    </div>

  );
}