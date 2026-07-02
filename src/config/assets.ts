const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const assetPath = (path: string) => `${basePath}${path}`;

export const audioAssets = {
  ambientLoop: "/audio/ocean-waves.mp3",
} as const;

export const imageAssets = {
  carouselHero: "/images/turtle-carousel-hero.png",
  carouselLeft: "/images/turtle-carousel-left.jpg",
  carouselRight: "/images/turtle-carousel-right.jpg",
  hero: "/images/turtle-hero.jpg",
  sponsorLogo: "/images/sponsor-logo.png",
  turtleLeft: "/images/turtle-left.jpg",
  turtleRight: "/images/turtle-right.jpg",
} as const;

export const imageSizes = {
  carouselDesktop: "706px",
  carouselResponsive: "(max-width: 1279px) calc(100vw - 48px), 706px",
  hero: "(max-width: 767px) 240px, (max-width: 1279px) 320px, 400px",
  profilePhoto: "409px",
} as const;
