import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface SharedLayoutBgProps extends React.HTMLAttributes<HTMLElement> {
  as?: "div" | "ul" | "ol" | "nav";
  inset?: number;
  pillClassName?: string;
  pillContainerClassName?: string;
  children?: React.ReactNode;
}

export const SharedLayoutBg = forwardRef<HTMLElement, SharedLayoutBgProps>(
  function SharedLayoutBg(
    {
      as: Component = "div",
      inset: _inset = 0,
      pillClassName: _pillClassName,
      pillContainerClassName: _pillContainerClassName,
      children,
      className,
      ...props
    },
    ref
  ) {
    return (
      // @ts-expect-error dynamic component ref
      <Component
        ref={ref}
        className={cn("relative", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
