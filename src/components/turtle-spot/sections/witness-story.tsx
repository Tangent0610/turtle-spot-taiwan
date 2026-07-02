"use client";

import { useState } from "react";
import { witnessIndicatorCount } from "@/config/ui";
import { fallbackActivity } from "@/data/fallback-activities";
import type { Activity } from "@/lib/activity-utils";
import { ArrowButton } from "@/components/turtle-spot/shared/arrow-button";
import { MarqueeText } from "@/components/turtle-spot/shared/marquee-text";
import { useSwipe, type SwipeEvent } from "@/components/turtle-spot/use-swipe";
import { WitnessPhone } from "@/components/turtle-spot/sections/witness-phone";

export const WitnessStory = ({ activities }: { activities: Activity[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activity = activities[activeIndex] ?? fallbackActivity;
  const activeIndicatorIndex = activeIndex % witnessIndicatorCount;
  const showPrevious = () =>
    setActiveIndex((index) =>
      index === 0 ? activities.length - 1 : index - 1,
    );
  const showNext = () =>
    setActiveIndex((index) => (index + 1) % activities.length);
  const selectIndicator = (index: number) => {
    setActiveIndex(index % activities.length);
  };
  const getTapX = (event: SwipeEvent) => {
    if ("clientX" in event) {
      return event.clientX;
    }

    const touch = event.changedTouches[0] ?? event.touches[0];

    return touch?.clientX ?? 0;
  };
  const handleMobileTap = (event: SwipeEvent) => {
    if (
      window.innerWidth >= 768 ||
      (event.target as HTMLElement).closest("a,button")
    ) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();

    if (getTapX(event) >= rect.left + rect.width / 2) {
      showNext();
    }
  };
  const swipeHandlers = useSwipe({
    onTap: handleMobileTap,
    onNext: showNext,
    onPrevious: showPrevious,
  });

  return (
    <section className="relative overflow-hidden bg-turtle-aqua">
      <MarqueeText
        className="top-[344px] text-[154px] text-turtle-white/85 max-xl:top-[334px] max-xl:text-[118px] max-md:top-[250px] max-md:text-[72px]"
        text="Witness Story Witness Story"
      />

      <div
        aria-label="Witness story carousel"
        className="relative mx-auto flex touch-pan-y max-w-[1440px] justify-center pt-20 max-md:pt-8"
        role="group"
        {...swipeHandlers}
      >
        <ArrowButton
          className="left-[max(16px,calc(50%_-_360px))] top-[420px] max-md:hidden"
          direction="left"
          onClick={showPrevious}
          size="small"
        />
        <WitnessPhone
          activeIndicatorIndex={activeIndicatorIndex}
          activity={activity}
          onSelectIndicator={selectIndicator}
        />
        <ArrowButton
          className="right-[max(16px,calc(50%_-_360px))] top-[420px] max-md:hidden"
          direction="right"
          onClick={showNext}
          size="small"
        />
      </div>
    </section>
  );
};
