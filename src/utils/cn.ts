import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Custom type scale from globals.css, so `text-hero` is not mistaken for a color.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        "hero",
        "mega",
        "end",
        "giant",
        "display",
        "title",
        "card",
        "heading",
        "subheading",
        "xl",
        "lg",
        "button",
        "credit",
        "nav",
        "number",
        "more",
        "counter",
        "label",
        "md",
        "cta",
        "tab",
        "body",
        "meta",
        "small",
        "tag",
        "index",
        "desc",
        "caption",
        "micro",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
