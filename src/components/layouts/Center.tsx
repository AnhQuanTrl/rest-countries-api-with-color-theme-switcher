import { cn } from "@/lib/utils";
import React from "react";

interface CenterProps {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
}

function Center({ className, children, as: Comp = "div" }: CenterProps) {
  return <Comp className={cn("mx-auto max-w-[90%]", className)}>{children}</Comp>;
}

export default Center;
