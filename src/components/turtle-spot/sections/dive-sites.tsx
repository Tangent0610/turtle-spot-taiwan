"use client";

import { diveSites } from "@/data/dive-sites";
import { useDictionary } from "@/components/turtle-spot/locale-context";
import { MarqueeText } from "@/components/turtle-spot/shared/marquee-text";
import { PinMarker } from "@/components/turtle-spot/sections/pin-marker";

export const DiveSites = () => {
  const dictionary = useDictionary();

  return (
    <section
      className="relative overflow-hidden rounded-b-[40px] bg-turtle-ink max-xl:rounded-b-[28px]"
      data-header-theme="dark"
    >
      <MarqueeText
        className="top-[345px] text-[150px] text-turtle-marquee/80 max-xl:top-[324px] max-xl:text-[112px] max-md:top-[300px] max-md:text-[72px]"
        text={"Favorite Dive Sites\u00a0\u00a0\u00a0\u00a0Favorite Dive Sites"}
      />
      <div className="relative z-10 min-h-[840px] max-xl:min-h-[760px] max-sm:min-h-[650px]">
        {diveSites.map((site) => (
          <PinMarker
            className={site.markerClass}
            colorClass={site.colorClass}
            key={site.title}
            label={dictionary.favoriteDive}
            title={site.title}
          />
        ))}
      </div>
    </section>
  );
};
