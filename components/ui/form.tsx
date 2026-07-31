"use client"

import * as React from "react"
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

const Form = FormProvider

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return <Controller {...props} />
}

const FormItemContext = React.createContext<{
  id: string
}>({ id: "" })

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        ref={ref}
        className={cn("space-y-2", className)}
        {...props}
      />
    </FormItemContext.Provider>
  )
})

FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => {
  const { id } = React.useContext(FormItemContext)

  return (
    <Label
      ref={ref}
      className={className}
      htmlFor={id}
      {...props}
    />
  )
})

FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ ...props }, ref) => {
  const { id } = React.useContext(FormItemContext)

  return <input ref={ref} id={id} {...props} />
})

FormControl.displayName = "FormControl"

const FormMessage = ({
  className,
  children,
}: React.HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <p className={cn("text-sm text-red-500", className)}>
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