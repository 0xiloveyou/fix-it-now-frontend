"use client";

import { useActionState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

import {
  loginAction,
  type LoginState,
} from "../_actions/authActions";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
    <form action={action} className="space-y-4">
      <Card className="space-y-4 p-5">
        <Input
          name="email"
          type="email"
          placeholder="Enter Your Email"
          required
        />

        <Input
          name="password"
          type="password"
          placeholder="Enter Your Password"
          required
        />

        <Button type="submit" disabled={pending}>
          {pending ? "Submitting..." : "Login"}
        </Button>
      </Card>
    </form>
  );
}