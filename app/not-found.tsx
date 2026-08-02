import Link from "next/link";
import { Home, SearchX } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] items-center justify-center px-4">
      <Card className="w-full max-w-xl shadow-lg">
        <CardHeader className="items-center text-center">
          <div className="mb-5 rounded-full bg-primary/10 p-5">
            <SearchX className="h-14 w-14 text-primary" />
          </div>

          <p className="text-6xl font-extrabold text-primary">
            404
          </p>

          <CardTitle className="mt-2 text-3xl">
            Page Not Found
          </CardTitle>

          <p className="mt-3 max-w-md text-muted-foreground">
            Sorry, the page you are looking for does not exist,
            may have been moved, or the URL is incorrect.
          </p>
        </CardHeader>

        <CardContent className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/">
            <Button className="w-full sm:w-auto">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>

          <Link href="/services">
            <Button
              variant="outline"
              className="w-full sm:w-auto"
            >
              Browse Services
            </Button>
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}