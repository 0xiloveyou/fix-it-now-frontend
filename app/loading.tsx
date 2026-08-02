import { Loader2 } from "lucide-react";


export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm rounded-xl border bg-card p-8 shadow-sm">
        <div className="mx-auto mb-6 h-14 w-14 animate-spin rounded-full border-4 border-primary border-t-transparent" />

        <h1 className="text-center text-2xl font-bold">
          Loading...
        </h1>

        <p className="mt-2 text-center text-sm text-muted-foreground">
          Fetching the latest data. This will only take a moment.
        </p>
      </div>
    </div>
  );
}