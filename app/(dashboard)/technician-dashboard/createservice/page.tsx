"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2, ArrowLeft, Wrench } from "lucide-react";
import Link from "next/link";

const formSchema = z.object({
  categoryId: z.string().min(1, "Category is required"),
  title: z.string().min(3).max(100),
  description: z.string().min(10).max(500),
  price: z.coerce.number().min(1),
  duration: z.coerce.number().min(10).max(1440),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateServicePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<FormValues, any, FormValues>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    categoryId: searchParams.get("categoryId") ?? "",
    title: "",
    description: "",
    price: 0,
    duration: 30,
  },
});

  const categoryName = searchParams.get("categoryName") ?? "";
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(values: FormValues) {
    try {
      setIsSubmitting(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/services`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to create service");

      toast.success("Service created successfully.");
      router.push("/technician-dashboard/services");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Create New Service</h1>
          <p className="mt-2 text-muted-foreground">Add a professional service for customers to book.</p>
        </div>
        <Link href="/technician-dashboard/category">
          <Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4" />Back</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="h-5 w-5" />Service Information
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

              <FormField control={form.control} name="categoryId" render={({field})=>(
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormField
  control={form.control}
  name="categoryId"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Category</FormLabel>

      <FormControl>
        <Input value={categoryName} disabled />
      </FormControl>

      <input type="hidden" value={field.value} name={field.name} />

      <FormMessage />
    </FormItem>
  )}
/>
                  <FormMessage/>
                </FormItem>
              )}/>

              <FormField control={form.control} name="title" render={({field})=>(
                <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field}/></FormControl><FormMessage/></FormItem>
              )}/>

              <FormField control={form.control} name="description" render={({field})=>(
                <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea rows={5} {...field}/></FormControl><FormMessage/></FormItem>
              )}/>

              <div className="grid gap-6 md:grid-cols-2">
                <FormField control={form.control} name="price" render={({field})=>(
                  <FormItem><FormLabel>Price</FormLabel><FormControl><Input type="number" {...field}/></FormControl><FormMessage/></FormItem>
                )}/>
                <FormField control={form.control} name="duration" render={({field})=>(
                  <FormItem><FormLabel>Duration</FormLabel><FormControl><Input type="number" {...field}/></FormControl><FormMessage/></FormItem>
                )}/>
              </div>

              <div className="flex justify-end gap-4">
                <Link href="/technician-dashboard/services">
                  <Button type="button" variant="outline">Cancel</Button>
                </Link>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Creating Service...</> : "Create Service"}
                </Button>
              </div>

            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}