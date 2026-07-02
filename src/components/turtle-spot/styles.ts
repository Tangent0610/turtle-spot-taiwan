export const controlFocusClass =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turtle-aqua";

export const headerControlClass =
  "cursor-pointer bg-turtle-ink transition-[background-color,box-shadow,transform] hover:-translate-y-0.5 hover:bg-turtle-hover hover:shadow-[0_8px_18px_rgba(0,0,0,0.24)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-turtle-aqua";

export const footerLinkClass =
  "block transition-colors hover:text-turtle-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-turtle-white";

export const desktopCarouselPanelClass =
  "left-1/2 top-0 aspect-[706/529] w-[min(706px,calc(100vw_-_80px))] max-lg:hidden";

export const responsiveCarouselPanelClass =
  "hidden max-lg:relative max-lg:left-auto max-lg:top-0 max-lg:mx-auto max-lg:block max-lg:aspect-[688/524] max-lg:w-[calc(98.039vw_-_78.431px)] max-lg:max-w-[675px] max-md:aspect-[327/249] max-md:w-[calc(98.039vw_-_47.059px)] max-md:max-w-none";

export const getDotClass = (isActive: boolean) =>
  `h-[10px] cursor-pointer rounded-full transition-[width,background-color,transform] hover:scale-125 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turtle-ink ${
    isActive ? "w-6 bg-turtle-ink" : "w-[10px] bg-turtle-white"
  }`;
