"use client";

import { useEffect, useState } from "react";
import {
  CreditCard,
  Calendar,
  Loader2,
  ReceiptText,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

interface Payment {
  id: string;
  transactionId: string | null;
  amount: number;
  currency: string;
  status:
    | "PENDING"
    | "COMPLETED"
    | "FAILED"
    | "REFUNDED";

  provider: string;
  paidAt: string | null;
  createdAt: string;

  booking: {
    id: string;

    service: {
      title: string;
    };
  };
}

export default function PaymentHistoryPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const getPayments = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/payments/my`,
          {
            credentials: "include",
            cache: "no-store",
          }
        );


        const result = await res.json();


        if (!res.ok) {
          throw new Error(
            result.message || "Failed to fetch payments"
          );
        }


        setPayments(result.data || []);

      } catch (error) {
        console.error(error);

      } finally {
        setLoading(false);
      }
    };


    getPayments();

  }, []);



  const getStatusVariant = (
    status: Payment["status"]
  ) => {

    switch (status) {

      case "COMPLETED":
        return "default";

      case "FAILED":
      case "REFUNDED":
        return "destructive";

      default:
        return "secondary";
    }
  };



  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }



  return (
    <main className="container mx-auto max-w-6xl px-4 py-10">

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Payment History
        </h1>


        <p className="mt-2 text-muted-foreground">
          View all your service payments and transactions.
        </p>

      </div>



      {payments.length === 0 ? (

        <Card>

          <CardContent className="py-12 text-center">

            <ReceiptText className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />


            <h2 className="text-xl font-semibold">
              No payment history found
            </h2>


            <p className="mt-2 text-muted-foreground">
              Your completed payments will appear here.
            </p>

          </CardContent>

        </Card>


      ) : (


        <div className="space-y-5">

          {payments.map((payment) => (

            <Card key={payment.id}>


              <CardHeader className="flex flex-row items-center justify-between">

                <div>

                  <CardTitle>
                    {payment.booking.service.title}
                  </CardTitle>


                  <p className="mt-1 text-sm text-muted-foreground">

                    Payment ID: {payment.id}

                  </p>

                </div>


                <Badge
                  variant={
                    getStatusVariant(payment.status)
                  }
                >
                  {payment.status}
                </Badge>


              </CardHeader>



              <CardContent>


                <div className="grid gap-5 md:grid-cols-2">


                  <div className="space-y-3">


                    <div className="flex items-center gap-2">

                      <CreditCard className="h-4 w-4" />

                      <span>
                        Amount:
                        <strong className="ml-2">
                          ৳ {payment.amount}
                        </strong>
                      </span>

                    </div>



                    <p>
                      <strong>
                        Provider:
                      </strong>{" "}
                      {payment.provider}
                    </p>



                    <p>
                      <strong>
                        Currency:
                      </strong>{" "}
                      {payment.currency}
                    </p>


                  </div>




                  <div className="space-y-3">


                    <div className="flex items-center gap-2">

                      <Calendar className="h-4 w-4" />


                      <span>

                        Paid At:{" "}

                        {payment.paidAt
                          ? new Date(
                              payment.paidAt
                            ).toLocaleDateString()
                          : "Not paid yet"}

                      </span>

                    </div>



                    <p>

                      <strong>
                        Transaction ID:
                      </strong>{" "}

                      {payment.transactionId || "N/A"}

                    </p>


                    <p>

                      <strong>
                        Created:
                      </strong>{" "}

                      {new Date(
                        payment.createdAt
                      ).toLocaleDateString()}

                    </p>


                  </div>


                </div>


              </CardContent>


            </Card>

          ))}


        </div>

      )}


    </main>
  );
}