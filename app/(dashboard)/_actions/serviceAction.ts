"use server";

import { cookies } from "next/headers";

export const getMyServices = async () => {
  const token = (await cookies()).get("accessToken")?.value;

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/services/me`,
    {
      method: "GET",
      headers: {
        Authorization: token || "",
      },
      cache: "no-store",
    }
  );

  return res.json();
};

export const deleteService = async (id: string) => {
  const token = (await cookies()).get("accessToken")?.value;

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/services/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: token || "",
      },
    }
  );

  return res.json();
};