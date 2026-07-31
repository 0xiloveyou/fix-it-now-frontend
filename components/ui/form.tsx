"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"

import { cn } from "@/lib/utils"

const Form = FormProvider

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: ControllerProps<TFieldValues, TName>
) => {
  return <Controller {...props} />
}

const FormItem = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn("space-y-2", className)}
      {...props}
    />
  )
}

const FormLabel = React.forwardRef<
  React.ElementRef<"label">,
  React.ComponentPropsWithoutRef<"label">
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn("text-sm font-medium", className)}
    {...props}
  />
))

FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>((props, ref) => {
  return <Slot ref={ref} {...props} />
})

FormControl.displayName = "FormControl"

const FormMessage = ({
  className,
  children,
  ...props
}: React.ComponentProps<"p">) => {
  return (
    <p
      className={cn("text-sm text-red-500", className)}
      {...props}
    >
      {children}
    </p>
  )
}

export {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
}