import { type VariantProps } from "class-variance-authority";
import { ReactNode } from "react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import { Button, buttonVariants } from "../../ui/button";
import Glow from "../../ui/glow";
import { Section } from "../../ui/section";

interface CTAProps {
  title?: string;
  description?: string;
  className?: string;
}

export default function CTA({
  title = "Request a Report",
  description = "Get started with Blundell Analytics. Fill out the form below and our team will get back to you with a customized analysis proposal.",
  className,
}: CTAProps) {
  return (
    <Section id="contact" className={cn("group relative overflow-hidden", className)}>
      <div className="max-w-container relative z-10 mx-auto flex flex-col items-center gap-6 text-center sm:gap-8">
        <h2 className="max-w-[640px] text-3xl leading-tight font-semibold sm:text-5xl sm:leading-tight">
          {title}
        </h2>
        <p className="text-muted-foreground max-w-[600px] text-lg">
          {description}
        </p>

        <form className="mt-8 flex w-full max-w-md flex-col text-left space-y-4 rounded-xl border border-muted/50 bg-background/50 p-8 shadow-xl backdrop-blur-md">
          <div className="flex flex-col space-y-1.5">
            <label htmlFor="name" className="text-sm font-medium">Name</label>
            <input id="name" type="text" placeholder="John Doe" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
          </div>

          <div className="flex flex-col space-y-1.5">
            <label htmlFor="club" className="text-sm font-medium">Club / Organization</label>
            <input id="club" type="text" placeholder="FC Example" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
          </div>

          <div className="flex flex-col space-y-1.5">
            <label htmlFor="email" className="text-sm font-medium">Work Email</label>
            <input id="email" type="email" placeholder="john@fcexample.com" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
          </div>

          <div className="flex flex-col space-y-1.5 pb-2">
            <label htmlFor="note" className="text-sm font-medium">Requirements Details</label>
            <textarea id="note" rows={4} placeholder="What are you looking to achieve?" className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
          </div>

          <Button type="button" size="lg" className="w-full">
            Submit Request
          </Button>
        </form>
      </div>
      <div className="absolute top-0 left-0 h-full w-full translate-y-[1rem] opacity-80 transition-all duration-500 ease-in-out group-hover:translate-y-[-2rem] group-hover:opacity-100">
        <Glow variant="bottom" />
      </div>
    </Section>
  );
}
