import Image from "next/image";
import type { CollageImage as CollageImageData } from "@/features/cases/types";
import { cn } from "@/utils/cn";

/** Size of the Figma "Projeto" collage, the base of every rectangle. */
export const COLLAGE_SIZE = { width: 1276, height: 655 } as const;

/** Position and size of a collage rectangle, as % of the collage. */
export function collageBoxStyle({ rect }: Pick<CollageImageData, "rect">) {
  return {
    left: `${(rect.x / COLLAGE_SIZE.width) * 100}%`,
    top: `${(rect.y / COLLAGE_SIZE.height) * 100}%`,
    width: `${(rect.width / COLLAGE_SIZE.width) * 100}%`,
    height: `${(rect.height / COLLAGE_SIZE.height) * 100}%`,
  };
}

type CollageImageProps = {
  image: CollageImageData;
  alt?: string;
  priority?: boolean;
  className?: string;
};

/** A collage image cropped inside its box like in the Figma fill. */
export function CollageImage({
  image,
  alt = "",
  priority,
  className,
}: CollageImageProps) {
  const { crop, rect } = image;
  return (
    <Image
      src={image.src}
      alt={alt}
      priority={priority}
      width={Math.round((rect.width * crop.width) / 100) * 2}
      height={Math.round((rect.height * crop.height) / 100) * 2}
      sizes="(min-width: 1024px) 50vw, 70vw"
      draggable={false}
      className={cn("absolute max-w-none select-none", className)}
      style={{
        width: `${crop.width}%`,
        height: `${crop.height}%`,
        left: `${crop.left}%`,
        top: `${crop.top}%`,
      }}
    />
  );
}
