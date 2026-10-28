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
        "back",
        "credit",
        "nav",
        "number",
        "more",
        "counter",
        "label",
        "md",
        "cta",
        "section",
        "lead",
        "tab",
        "body",
        "meta",
        "small",
        "tag",
        "index",
        "desc",
        "caption",
        "fine",
        "micro",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
