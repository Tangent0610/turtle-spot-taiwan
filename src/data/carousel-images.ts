import { imageAssets } from "@/config/assets";

export const carouselImages = [
  {
    alt: "Sea turtle swimming over coral",
    src: imageAssets.carouselHero,
  },
  {
    alt: "Left turtle face",
    src: imageAssets.carouselLeft,
  },
  {
    alt: "Right turtle face",
    src: imageAssets.carouselRight,
  },
] as const;

export type CarouselImageData = (typeof carouselImages)[number];
