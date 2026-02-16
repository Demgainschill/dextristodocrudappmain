'use client'

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const formSchema = z.object({
  name: z.string().min(2, "Name too short"),
  email: z.string().email("Invalid email"),
})

export default function TestForm() {

  const [content, setContent] = useState("")

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  })

  function onSubmit(values: any) {
    console.log("Submitted:", values)

    setContent("Submitted!")   // show success

    setTimeout(() => {
      setContent("")          // auto hide after 3s
    }, 1000)

    form.reset()              // optional: clear fields
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-md mx-auto mt-10 bg-red-400 px-6 py-6"
      >

        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Your name"
                  onChange={(e) => {
                    field.onChange(e)
                    setContent("")   // hide when typing
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="you@example.com"
                  onChange={(e) => {
                    field.onChange(e)
                    setContent("")   // hide when typing
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-gray-300">
          Send
        </Button>

        {/* ✅ Success message */}
        {content && (
          <div className="font-black font-semibold text-center">
            {content}
          </div>
        )}

      </form>
    </Form>
  )
}
