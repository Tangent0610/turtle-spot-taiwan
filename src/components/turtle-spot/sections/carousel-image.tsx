import Image from "next/image";
import { assetPath } from "@/config/assets";
import type { CarouselImageData } from "@/data/carousel-images";

export const CarouselImage = ({
  className,
  image,
  isActive,
  motionClass,
  sizes,
}: {
  className: string;
  image: CarouselImageData;
  isActive: boolean;
  motionClass?: string;
  sizes: string;
}) => (
  <div
    className={`absolute overflow-hidden rounded-2xl bg-turtle-aqua transition-[opacity,transform] duration-700 ease-out ${
      motionClass ??
      (isActive ? "scale-[1.02] opacity-100" : "scale-95 opacity-45")
    } ${className}`}
  >
    <Image
      alt={image.alt}
      className="object-cover"
      fill
      loading="eager"
      quality={95}
      sizes={sizes}
      src={assetPath(image.src)}
    />
  </div>
);
