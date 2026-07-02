"use client";

import Image from "next/image";
import { assetPath, imageAssets, imageSizes } from "@/config/assets";
import {
  profilePhotos,
  turtleFacts,
  turtleProfile,
} from "@/data/turtle-profile";
import { useDictionary } from "@/components/turtle-spot/locale-context";
import { MarqueeText } from "@/components/turtle-spot/shared/marquee-text";
import { ProfilePhoto } from "@/components/turtle-spot/sections/profile-photo";

export const HeroSection = () => {
  const dictionary = useDictionary();

  return (
    <section className="relative overflow-hidden bg-turtle-aqua pb-0 pt-36 max-xl:pb-[21px] max-xl:pt-[88px] max-sm:pb-0 max-sm:pt-[120px]">
      <MarqueeText
        className="top-[236px] text-[190px] text-turtle-white/80 max-xl:top-[244px] max-xl:text-[88px] max-lg:top-[204px] max-sm:top-[190px]"
        text={"Information\u00a0\u00a0\u00a0\u00a0Information"}
      />

      <div className="relative z-10 mx-auto aspect-square w-[clamp(240px,41.667vw,400px)] overflow-hidden rounded-full border-[6px] border-turtle-white bg-turtle-panel">
        <Image
          alt="Sea turtle swimming over coral"
          className="object-cover"
          fill
          loading="eager"
          priority
          sizes={imageSizes.hero}
          src={assetPath(imageAssets.hero)}
        />
      </div>

      <section className="relative z-20 mx-auto mt-[143px] w-[min(922px,calc(100vw_-_80px))] max-xl:mt-28 max-sm:mx-0 max-sm:mt-[110px] max-sm:w-full">
        <div className="absolute -top-[63px] left-0 flex h-[63px] w-[315px] items-center whitespace-nowrap rounded-t-2xl bg-turtle-panel px-10 text-[18px] font-black max-xl:-top-14 max-xl:h-14 max-xl:w-full max-xl:px-6 max-xl:text-base">
          {turtleProfile.name}&nbsp;&nbsp; {turtleProfile.code}
        </div>
        <div className="bg-white px-10 pb-10 pt-10 shadow-[0_1px_0_rgba(0,0,0,0.02)] max-xl:px-6">
          <div className="grid grid-cols-2 gap-x-6 gap-y-6 max-sm:grid-cols-1">
            {turtleFacts.map((fact, index) => (
              <div
                className={`border-b border-turtle-aqua pb-4 text-[15px] font-black leading-6 max-xl:text-sm ${
                  fact.wide ? "col-span-2 max-sm:col-span-1" : ""
                }`}
                key={index}
              >
                <span>{dictionary.factLabels[index]}：</span>
                <span>{fact.value}</span>
              </div>
            ))}
          </div>

          <div className="mt-9 grid grid-cols-2 gap-6 max-sm:grid-cols-1">
            {profilePhotos.map((photo) => (
              <ProfilePhoto
                alt={photo.alt}
                key={photo.src}
                label={dictionary[photo.labelKey]}
                src={photo.src}
              />
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};
