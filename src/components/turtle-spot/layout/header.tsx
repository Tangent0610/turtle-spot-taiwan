"use client";

import { useEffect, useRef, useState } from "react";
import { assetPath, audioAssets } from "@/config/assets";
import {
  CloseIcon,
  MenuIcon,
  MutedSpeakerIcon,
  SpeakerIcon,
} from "@/components/turtle-spot/icons";
import { BrandLogo } from "@/components/turtle-spot/layout/brand-logo";
import { useDictionary } from "@/components/turtle-spot/locale-context";
import { IconButton } from "@/components/turtle-spot/shared/icon-button";
import { headerControlClass } from "@/components/turtle-spot/styles";

export const Header = ({
  isMenuOpen,
  onLocaleToggle,
  onMenuToggle,
}: {
  isMenuOpen: boolean;
  onLocaleToggle: () => void;
  onMenuToggle: () => void;
}) => {
  const dictionary = useDictionary();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isSoundMuted, setIsSoundMuted] = useState(true);

  useEffect(() => {
    const updateLogoColor = () => {
      const brand = document.querySelector<HTMLElement>("[data-header-brand]");
      const logoY = window.innerWidth < 768 ? 20 : 28;
      const isOverDark = Array.from(
        document.querySelectorAll<HTMLElement>("[data-header-theme='dark']"),
      ).some((section) => {
        const rect = section.getBoundingClientRect();

        return rect.top <= logoY && rect.bottom >= logoY;
      });
      const shouldBeWhite = brand?.dataset.menuOpen === "true" || isOverDark;

      brand?.classList.toggle("text-turtle-white", shouldBeWhite);
      brand?.classList.toggle("text-turtle-ink", !shouldBeWhite);
    };

    updateLogoColor();
    window.addEventListener("resize", updateLogoColor);
    window.addEventListener("scroll", updateLogoColor, { passive: true });

    return () => {
      window.removeEventListener("resize", updateLogoColor);
      window.removeEventListener("scroll", updateLogoColor);
    };
  }, []);

  useEffect(() => {
    window.dispatchEvent(new Event("scroll"));
  }, [isMenuOpen]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio || isSoundMuted) {
      return;
    }

    audio.volume = 0.24;
    const playAudio = () => {
      void audio.play().catch(() => undefined);
    };

    playAudio();
    window.addEventListener("pointerdown", playAudio, { once: true });

    return () => window.removeEventListener("pointerdown", playAudio);
  }, [isSoundMuted]);

  const toggleSound = () => {
    const audio = audioRef.current;

    if (isSoundMuted) {
      if (audio) {
        audio.volume = 0.24;
        void audio.play().catch(() => undefined);
      }
      setIsSoundMuted(false);
      return;
    }

    audio?.pause();
    setIsSoundMuted(true);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-14 items-start justify-between max-lg:h-10">
      <audio
        ref={audioRef}
        loop
        preload="none"
        src={assetPath(audioAssets.ambientLoop)}
      />
      <BrandLogo
        className={isMenuOpen ? "text-turtle-white" : "text-turtle-ink"}
        isMenuOpen={isMenuOpen}
        trackHeaderTheme
      />

      <div className="flex h-14 items-stretch text-turtle-white max-lg:h-10">
        <button
          aria-label="Toggle language"
          className={`flex w-[60px] items-center justify-center rounded-bl-xl text-[16px] font-black tracking-[0.08em] max-lg:w-10 max-lg:text-[13px] max-sm:w-10 max-sm:text-[12px] ${headerControlClass}`}
          onClick={onLocaleToggle}
          type="button"
        >
          {dictionary.localeButton}
        </button>
        <IconButton
          label={isSoundMuted ? "Play sound" : dictionary.sound}
          onClick={toggleSound}
          pressed={!isSoundMuted}
        >
          {isSoundMuted ? (
            <MutedSpeakerIcon className="h-5 w-5 max-lg:h-4 max-lg:w-4" />
          ) : (
            <SpeakerIcon className="h-5 w-5 max-lg:h-4 max-lg:w-4" />
          )}
        </IconButton>
        <button
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? dictionary.closeMenu : dictionary.openMenu}
          className={`flex w-[132px] items-center justify-center gap-2 text-[11px] font-black tracking-[0.18em] max-lg:w-10 max-lg:gap-0 max-sm:w-10 ${headerControlClass}`}
          onClick={onMenuToggle}
          type="button"
        >
          {isMenuOpen ? (
            <CloseIcon className="h-5 w-5 max-lg:h-4 max-lg:w-4" />
          ) : (
            <MenuIcon className="h-4 w-6 max-lg:h-3.5 max-lg:w-5" />
          )}
          <span className="max-lg:hidden">MENU</span>
        </button>
      </div>
    </header>
  );
};
