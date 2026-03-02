"use client";

import { useState, useTransition } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

// ─── Schema ──────────────────────────────────────────────────────────────────

const formSchema = z.object({
  // Personal info
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(/^\+?[0-9\s\-()]{7,15}$/, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),

  // Contact details
  subject: z.string().min(1, "Please select a subject"),
  priority: z.string().min(1, "Please select a priority"),
  message: z.string().min(10, "Message must be at least 10 characters"),

  // Company info
  company: z.string().optional(),
  website: z.union([
  z.string().url("Please enter a valid URL (include https://)"),
  z.literal(""),
]).optional(),
  jobTitle: z.string().optional(),

  // Preferences
  newsletter: z.boolean().default(false),
  terms: z.boolean().refine((v) => v === true, {
    message: "You must accept the terms and conditions",
  }),
});

type FormValues = z.infer<typeof formSchema>;

// ─── Helpers ─────────────────────────────────────────────────────────────────

const SUBJECTS = [
  { value: "general", label: "General Inquiry" },
  { value: "support", label: "Technical Support" },
  { value: "billing", label: "Billing & Payments" },
  { value: "partnership", label: "Partnership Opportunity" },
  { value: "feedback", label: "Feedback" },
  { value: "other", label: "Other" },
];

const PRIORITIES = [
  { value: "low", label: "🟢 Low" },
  { value: "medium", label: "🟡 Medium" },
  { value: "high", label: "🔴 High — Urgent" },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function TestForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      priority: "",
      message: "",
      company: "",
      website: "",
      jobTitle: "",
      newsletter: false,
      terms: false,
    },
  });

  function onSubmit(values: FormValues) {
    startTransition(async () => {
    try {
    const { firstName, lastName, terms, ...rest } = values;
      await createContact({
      name: `${firstName} ${lastName}`,
      ...rest,
      });
        setStatus("success");
        form.reset();
      } catch (error) {
        setStatus("error");
      } finally {
        setTimeout(() => setStatus("idle"), 4000);
      }
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-white tracking-tight">
            Get in Touch
          </h1>
          <p className="mt-2 text-slate-400 text-sm">
            Fill out the form below and we'll get back to you shortly.
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8 shadow-2xl space-y-8"
          >
            {/* ── Section 1: Personal Info ── */}
            <section>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-200">
                        First Name *
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Jane"
                          className="bg-white/10 border-white/20 text-white placeholder:text-slate-500 focus:border-indigo-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-200">
                        Last Name *
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Doe"
                          className="bg-white/10 border-white/20 text-white placeholder:text-slate-500 focus:border-indigo-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-200">
                        Email Address *
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="jane@example.com"
                          className="bg-white/10 border-white/20 text-white placeholder:text-slate-500 focus:border-indigo-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-200">
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          className="bg-white/10 border-white/20 text-white placeholder:text-slate-500 focus:border-indigo-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </section>

            {/* ── Section 2: Company Info ── */}
            <section>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">
                Company (Optional)
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-200">Company</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Acme Inc."
                          className="bg-white/10 border-white/20 text-white placeholder:text-slate-500 focus:border-indigo-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="jobTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-200">Job Title</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Product Manager"
                          className="bg-white/10 border-white/20 text-white placeholder:text-slate-500 focus:border-indigo-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-200">Website</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="url"
                          placeholder="https://acme.com"
                          className="bg-white/10 border-white/20 text-white placeholder:text-slate-500 focus:border-indigo-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </section>

            {/* ── Section 3: Message ── */}
            <section>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">
                Your Message
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-200">
                        Subject *
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-indigo-400">
                            <SelectValue placeholder="Select a subject…" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {SUBJECTS.map((s) => (
                            <SelectItem key={s.value} value={s.value}>
                              {s.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-200">
                        Priority *
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-indigo-400">
                            <SelectValue placeholder="Select priority…" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {PRIORITIES.map((p) => (
                            <SelectItem key={p.value} value={p.value}>
                              {p.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-200">Message *</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        rows={5}
                        placeholder="Tell us how we can help you…"
                        className="bg-white/10 border-white/20 text-white placeholder:text-slate-500 focus:border-indigo-400 resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>

            {/* ── Section 4: Preferences ── */}
            <section className="space-y-3">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Preferences
              </h2>
              <FormField
                control={form.control}
                name="newsletter"
                render={({ field }) => (
                  <FormItem className="flex items-start gap-3">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="mt-0.5 border-white/30 data-[state=checked]:bg-indigo-500"
                      />
                    </FormControl>
                    <div>
                      <FormLabel className="text-slate-200 cursor-pointer">
                        Subscribe to newsletter
                      </FormLabel>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Get product updates, tips, and industry news.
                      </p>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex items-start gap-3">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="mt-0.5 border-white/30 data-[state=checked]:bg-indigo-500"
                      />
                    </FormControl>
                    <div>
                      <FormLabel className="text-slate-200 cursor-pointer">
                        I agree to the{" "}
                        <a
                          href="#"
                          className="text-indigo-400 hover:text-indigo-300 underline"
                        >
                          Terms & Conditions
                        </a>{" "}
                        *
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </section>

            {/* ── Submit ── */}
            <div className="pt-2">
              <Button
                type="submit"
                disabled={isPending}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl transition-all duration-200 disabled:opacity-50"
              >
                {isPending ? "Sending…" : "Send Message"}
              </Button>
            </div>

            {/* ── Status Messages ── */}
            {status === "success" && (
              <div className="text-center text-sm font-semibold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-lg py-3">
                ✓ Message sent! We'll be in touch soon.
              </div>
            )}
            {status === "error" && (
              <div className="text-center text-sm font-semibold text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg py-3">
                ✗ Something went wrong. Please try again.
              </div>
            )}
          </form>
        </Form>

        <p className="text-center text-slate-600 text-xs mt-6">
          * Required fields
        </p>
      </div>
    </div>
  );
}
