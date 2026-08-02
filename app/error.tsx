"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[80vh] items-center justify-center px-4">
      <Card className="w-full max-w-xl shadow-lg">
        <CardHeader className="items-center text-center">
          <div className="mb-5 rounded-full bg-destructive/10 p-5">
            <AlertTriangle className="h-14 w-14 text-destructive" />
          </div>

          <CardTitle className="text-3xl font-bold">
            Something Went Wrong
          </CardTitle>

          <p className="mt-3 text-muted-foreground">
            An unexpected error occurred while loading this page.
            Please try again or return to the home page.
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {process.env.NODE_ENV === "development" && (
            <div className="rounded-md border bg-muted p-4">
              <p className="mb-2 font-semibold text-destructive">
                Development Error
              </p>

              <p className="break-all text-sm text-muted-foreground">
                {error.message}
              </p>
            </div>
          )}

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button onClick={reset}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>

            <Link href="/">
              <Button variant="outline" className="w-full sm:w-auto">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}