"use client";

import { useActionState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

import {
  loginAction,
  type LoginState,
} from "../_actions/authActions";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const initialState: LoginState = {
  success: false,
  statusCode: 0,
  message: "",
};

export default function LoginForm() {
  const searchParams = useSearchParams();

  const redirectTo = searchParams.get("redirectTo") ?? "";

  const [state, action, pending] = useActionState(
    loginAction.bind(null, redirectTo),
    initialState
  );

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message);
    } else {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <Card className="w-full max-w-lg min-h-[300px] shadow-lg">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold">
            Welcome Back
          </CardTitle>

          <CardDescription>
            Sign in to your account to continue.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form action={action} className="space-y-4">
            <Input
              name="email"
              type="email"
              placeholder="Enter your email"
              required
            />

            <Input
              name="password"
              type="password"
              placeholder="Enter your password"
              required
            />

            <Button
              type="submit"
              disabled={pending}
              className="w-full"
            >
              {pending ? "Signing in..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}