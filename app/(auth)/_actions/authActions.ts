"use server";

import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const loginSchema = z.object({
  email: z.email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export type LoginState = {
  success: boolean;
  statusCode?: number;
  message?: string;
  data?: {
    accessToken: string;
    refreshToken: string;
  };
};

export async function loginAction(
  redirectTo: string,
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const values = {
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
  };

  const validation = loginSchema.safeParse(values);

  if (!validation.success) {
    return {
      success: false,
      statusCode: 400,
      message: validation.error.issues[0].message,
    };
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validation.data),
    }
  );

  const result = await res.json();

  if (!result.success) {
    return {
      success: false,
      statusCode: res.status,
      message: result.message || "Invalid email or password.",
    };
  }

  const cookieStore = await cookies();

  cookieStore.set("accessToken", result.data.accessToken, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
  });

  cookieStore.set("refreshToken", result.data.refreshToken, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });

  const decoded = jwt.decode(result.data.accessToken) as JwtPayload;

  if (
    redirectTo &&
    redirectTo.startsWith("/") &&
    !redirectTo.startsWith("//")
  ) {
    redirect(redirectTo);
  }

  switch (decoded.role) {
    case "CUSTOMER":
      redirect("/customer-dashboard");

    case "ADMIN":
      redirect("/admin-dashboard");

    case "TECHNICIAN":
      redirect("/technician-dashboard");

    default:
      return {
        success: true,
        statusCode: 200,
        message: "Login successful.",
        data: result.data,
      };
  }
}