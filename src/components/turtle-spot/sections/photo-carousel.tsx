"use client";

import { useEffect, useRef, useState } from "react";
import { imageSizes } from "@/config/assets";
import { carouselAnimationDuration, carouselAutoplayDelay } from "@/config/ui";
import { carouselImages } from "@/data/carousel-images";
import { ArrowButton } from "@/components/turtle-spot/shared/arrow-button";
import { useSwipe } from "@/components/turtle-spot/use-swipe";
import {
  desktopCarouselPanelClass,
  getDotClass,
  responsiveCarouselPanelClass,
} from "@/components/turtle-spot/styles";
import { CarouselImage } from "@/components/turtle-spot/sections/carousel-image";

type CarouselDirection = "next" | "previous";

export const PhotoCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplaySeed, setAutoplaySeed] = useState(0);
  const [slideAnimation, setSlideAnimation] = useState<{
    direction: CarouselDirection;
    from: number;
    to: number;
  } | null>(null);
  const animationTimeoutRef = useRef<number | null>(null);
  const previousIndex =
    (activeIndex + carouselImages.length - 1) % carouselImages.length;
  const nextIndex = (activeIndex + 1) % carouselImages.length;
  const animationFillIndex =
    slideAnimation?.direction === "next"
      ? (slideAnimation.to + 1) % carouselImages.length
      : slideAnimation?.direction === "previous"
        ? (slideAnimation.to + carouselImages.length - 1) %
          carouselImages.length
        : null;

  const getDirection = (target: number): CarouselDirection => {
    const forward =
      (target - activeIndex + carouselImages.length) % carouselImages.length;
    const backward =
      (activeIndex - target + carouselImages.length) % carouselImages.length;

    return backward < forward ? "previous" : "next";
  };

  const goToSlide = (
    next: number | ((index: number) => number),
    direction?: CarouselDirection,
  ) => {
    const target =
      ((typeof next === "function" ? next(activeIndex) : next) +
        carouselImages.length) %
      carouselImages.length;

    if (target === activeIndex) {
      return;
    }

    if (animationTimeoutRef.current !== null) {
      window.clearTimeout(animationTimeoutRef.current);
    }

    setSlideAnimation({
      direction: direction ?? getDirection(target),
      from: activeIndex,
      to: target,
    });
    setActiveIndex(target);
    setAutoplaySeed((seed) => seed + 1);
    animationTimeoutRef.current = window.setTimeout(() => {
      setSlideAnimation(null);
      animationTimeoutRef.current = null;
    }, carouselAnimationDuration);
  };
  const goPrevious = () =>
    goToSlide(
      (index) => (index + carouselImages.length - 1) % carouselImages.length,
      "previous",
    );
  const goNext = () =>
    goToSlide((index) => (index + 1) % carouselImages.length, "next");
  const swipeHandlers = useSwipe({
    onNext: goNext,
    onPrevious: goPrevious,
  });

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const target = (activeIndex + 1) % carouselImages.length;

      if (animationTimeoutRef.current !== null) {
        window.clearTimeout(animationTimeoutRef.current);
      }

      setSlideAnimation({ direction: "next", from: activeIndex, to: target });
      setActiveIndex(target);
      animationTimeoutRef.current = window.setTimeout(() => {
        setSlideAnimation(null);
        animationTimeoutRef.current = null;
      }, carouselAnimationDuration);
    }, carouselAutoplayDelay);

    return () => window.clearTimeout(timeout);
  }, [autoplaySeed, activeIndex]);

  useEffect(
    () => () => {
      if (animationTimeoutRef.current !== null) {
        window.clearTimeout(animationTimeoutRef.current);
      }
    },
    [],
  );

  return (
    <section className="relative overflow-hidden rounded-b-[40px] bg-turtle-panel pb-20 pt-[120px] max-lg:py-20 max-md:rounded-b-[28px]">
      <div
        className="relative mx-auto h-[590px] touch-pan-y max-w-[1440px] max-lg:h-auto max-lg:px-6"
        {...swipeHandlers}
      >
        {slideAnimation ? (
          <>
            {animationFillIndex !== null ? (
              <CarouselImage
                className={desktopCarouselPanelClass}
                image={carouselImages[animationFillIndex]}
                isActive={false}
                motionClass={
                  slideAnimation.direction === "next"
                    ? "animate-carousel-far-right-to-right"
                    : "animate-carousel-far-left-to-left"
                }
                sizes={imageSizes.carouselDesktop}
              />
            ) : null}
            <CarouselImage
              className={desktopCarouselPanelClass}
              image={
                carouselImages[
                  slideAnimation.direction === "next"
                    ? (slideAnimation.from + carouselImages.length - 1) %
                      carouselImages.length
                    : (slideAnimation.from + 1) % carouselImages.length
                ]
              }
              isActive={false}
              motionClass={
                slideAnimation.direction === "next"
                  ? "animate-carousel-left-to-far-left"
                  : "animate-carousel-right-to-far-right"
              }
              sizes={imageSizes.carouselDesktop}
            />
            <CarouselImage
              className={desktopCarouselPanelClass}
              image={carouselImages[slideAnimation.from]}
              isActive
              motionClass={
                slideAnimation.direction === "next"
                  ? "animate-carousel-center-to-left"
                  : "animate-carousel-center-to-right"
              }
              sizes={imageSizes.carouselDesktop}
            />
            <CarouselImage
              className={desktopCarouselPanelClass}
              image={carouselImages[slideAnimation.to]}
              isActive
              motionClass={
                slideAnimation.direction === "next"
                  ? "animate-carousel-right-to-center"
                  : "animate-carousel-left-to-center"
              }
              sizes={imageSizes.carouselDesktop}
            />
          </>
        ) : (
          <>
            <CarouselImage
              className={desktopCarouselPanelClass}
              image={carouselImages[previousIndex]}
              isActive={false}
              motionClass="carousel-desktop-left"
              sizes={imageSizes.carouselDesktop}
            />
            <CarouselImage
              className={desktopCarouselPanelClass}
              image={carouselImages[activeIndex]}
              isActive
              motionClass="carousel-desktop-center"
              sizes={imageSizes.carouselDesktop}
            />
            <CarouselImage
              className={desktopCarouselPanelClass}
              image={carouselImages[nextIndex]}
              isActive={false}
              motionClass="carousel-desktop-right"
              sizes={imageSizes.carouselDesktop}
            />
          </>
        )}
        <CarouselImage
          className={responsiveCarouselPanelClass}
          image={carouselImages[activeIndex]}
          isActive
          key={activeIndex}
          motionClass="scale-[1.02] opacity-100 animate-carousel-fade"
          sizes={imageSizes.carouselResponsive}
        />

        <ArrowButton
          className="left-[calc(50%_-_504px)] top-[238px] max-lg:hidden"
          direction="left"
          onClick={goPrevious}
        />
        <ArrowButton
          className="right-[calc(50%_-_504px)] top-[238px] max-lg:hidden"
          direction="right"
          onClick={goNext}
        />

        <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 gap-3 max-lg:hidden">
          {carouselImages.map((image, dot) => (
            <button
              aria-label={`${image.alt} slide`}
              aria-current={dot === activeIndex}
              className={getDotClass(dot === activeIndex)}
              key={image.src}
              onClick={() => goToSlide(dot)}
              type="button"
            />
          ))}
        </div>

        <div className="mt-8 hidden items-center justify-center gap-7 max-lg:flex max-md:mt-9 max-md:gap-5">
          <ArrowButton
            direction="left"
            onClick={goPrevious}
            placement="static"
          />
          <div className="flex items-center gap-3">
            {carouselImages.map((image, dot) => (
              <button
                aria-label={`${image.alt} slide`}
                aria-current={dot === activeIndex}
                className={getDotClass(dot === activeIndex)}
                key={image.src}
                onClick={() => goToSlide(dot)}
                type="button"
              />
            ))}
          </div>
          <ArrowButton direction="right" onClick={goNext} placement="static" />
        </div>
      </div>
    </section>
  );
};
