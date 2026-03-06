import { type VariantProps } from "class-variance-authority";
import { ArrowRightIcon } from "lucide-react";
import { ReactNode } from "react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import Github from "../../logos/github";
import { Badge } from "../../ui/badge";
import { Button, buttonVariants } from "../../ui/button";
import Glow from "../../ui/glow";
import { Mockup, MockupFrame } from "../../ui/mockup";
import Screenshot from "../../ui/screenshot";
import { Section } from "../../ui/section";

interface HeroButtonProps {
  href: string;
  text: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  icon?: ReactNode;
  iconRight?: ReactNode;
}

interface HeroProps {
  title?: string;
  description?: string;
  mockup?: ReactNode | false;
  badge?: ReactNode | false;
  buttons?: HeroButtonProps[] | false;
  className?: string;
}

export default function Hero({
  title = "Every transfer decision has a cost. Make it a calculated one.",
  description = "We help your club make smarter and more tactical transfer decisions, backed by robust mathematical and statistical models and extensive data.",
  mockup = (
    <div className="flex h-[300px] w-full items-center justify-center rounded-xl border border-dashed border-muted-foreground/30 bg-muted/20 sm:h-[450px] lg:h-[550px]">
      <span className="text-muted-foreground font-medium text-center">React App<br />Screenshot (Main)</span>
    </div>
  ),
  badge = (
    <Badge variant="outline" className="animate-appear">
      <span className="text-muted-foreground">
        Transfer Market Intelligence
      </span>
      <a href="/#contact" className="flex items-center gap-1">
        Request a Report
        <ArrowRightIcon className="size-3" />
      </a>
    </Badge>
  ),
  buttons = [
    {
      href: "/#contact",
      text: "Request a Report",
      variant: "default",
    },
    {
      href: "#methodology",
      text: "Explore Methodology",
      variant: "glow",
    },
  ],
  className,
}: HeroProps) {
  return (
    <Section
      className={cn(
        "fade-bottom overflow-hidden pb-0 sm:pb-0 md:pb-0",
        className,
      )}
    >
      <div className="max-w-container mx-auto flex flex-col gap-12 pt-16 sm:gap-24">
        <div className="flex flex-col items-center gap-6 text-center sm:gap-12">
          {badge !== false && badge}
          <h1 className="animate-appear from-foreground to-foreground dark:to-muted-foreground relative z-10 inline-block bg-linear-to-r bg-clip-text text-4xl leading-tight font-semibold text-balance text-transparent drop-shadow-2xl sm:text-6xl sm:leading-tight md:text-8xl md:leading-tight">
            {title}
          </h1>
          <p className="text-md animate-appear text-muted-foreground relative z-10 max-w-[740px] font-medium text-balance opacity-0 delay-100 sm:text-xl">
            {description}
          </p>
          {buttons !== false && buttons.length > 0 && (
            <div className="animate-appear relative z-10 flex justify-center gap-4 opacity-0 delay-300">
              {buttons.map((button, index) => (
                <Button
                  key={index}
                  variant={button.variant || "default"}
                  size="lg"
                  asChild
                >
                  <a href={button.href}>
                    {button.icon}
                    {button.text}
                    {button.iconRight}
                  </a>
                </Button>
              ))}
            </div>
          )}
          {mockup !== false && (
            <div className="relative w-full pt-12 pb-24 flex justify-center">
              {/* Left Screen */}
              <div className="absolute left-[-2%] sm:left-[2%] lg:left-[5%] top-[30%] w-[50%] sm:w-[45%] lg:w-[40%] z-0 -rotate-6 opacity-80 blur-[1px] hover:blur-none hover:opacity-100 hover:z-20 hover:scale-105 transition-all duration-500 hidden sm:block">
                <MockupFrame size="small" className="shadow-2xl">
                  <Mockup type="responsive" className="bg-background/90 w-full rounded-xl border-0">
                    <div className="flex h-[200px] w-full items-center justify-center rounded-xl border border-dashed border-muted-foreground/30 bg-muted/20 sm:h-[350px] lg:h-[450px]">
                      <span className="text-muted-foreground font-medium text-center">React App<br />Screenshot (Left)</span>
                    </div>
                  </Mockup>
                </MockupFrame>
              </div>

              {/* Right Screen */}
              <div className="absolute right-[-2%] sm:right-[2%] lg:right-[5%] top-[30%] w-[50%] sm:w-[45%] lg:w-[40%] z-0 rotate-6 opacity-80 blur-[1px] hover:blur-none hover:opacity-100 hover:z-20 hover:scale-105 transition-all duration-500 hidden sm:block">
                <MockupFrame size="small" className="shadow-2xl">
                  <Mockup type="responsive" className="bg-background/90 w-full rounded-xl border-0">
                    <div className="flex h-[200px] w-full items-center justify-center rounded-xl border border-dashed border-muted-foreground/30 bg-muted/20 sm:h-[350px] lg:h-[450px]">
                      <span className="text-muted-foreground font-medium text-center">React App<br />Screenshot (Right)</span>
                    </div>
                  </Mockup>
                </MockupFrame>
              </div>

              {/* Main Center Screen */}
              <div className="relative z-10 w-full sm:w-[65%] lg:w-[55%] mt-8 sm:mt-0 transition-transform duration-500 hover:scale-[1.02]">
                <MockupFrame
                  className="animate-appear opacity-0 delay-700 shadow-2xl"
                  size="small"
                >
                  <Mockup
                    type="responsive"
                    className="bg-background/90 w-full rounded-xl border-0"
                  >
                    {mockup}
                  </Mockup>
                </MockupFrame>
              </div>

              <Glow
                variant="top"
                className="animate-appear-zoom opacity-0 delay-1000 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[-1]"
              />
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
