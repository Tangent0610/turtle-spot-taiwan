"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { getActivities } from "@/lib/apollo";
import {
  formatActivityDate,
  sortActivitiesByDateDesc,
  type Activity,
} from "@/lib/activity-utils";

const turtleFacts = [
  { value: "淡定哥" },
  { value: "綠蠵龜" },
  { value: "成年龜" },
  { value: "迷彩" },
  { value: "眼下四片" },
  { value: "眼下三片" },
  { value: "Chun-Ting Jeffery Liu" },
  { value: "陳坤田" },
  {
    value: "背甲中間受傷，2017/03/24記錄到時已經有受傷了，目前看起來還沒好。",
    wide: true,
  },
] satisfies { value: string; wide?: boolean }[];

const navItems = [
  { title: "Map", active: true },
  { title: "Article", active: false },
  { title: "About", active: false },
  { title: "Resources", active: false },
  { title: "Report Sightings", active: false },
] as const;

const dictionaries = {
  zh: {
    code: "zh-Hant",
    localeButton: "EN",
    sound: "Sound",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    menuContact: "聯絡我們 —",
    menuFollow: "追蹤我們 —",
    navLabels: ["海龜地圖", "文章分享", "關於我們", "教育資源", "目擊回報"],
    factLabels: [
      "名字",
      "品種",
      "體型",
      "背甲花紋",
      "右臉鱗片",
      "左臉鱗片",
      "命名者",
      "回報者",
      "外型特徵",
    ],
    leftFace: "左臉：",
    rightFace: "右臉：",
    favoriteDive: "最愛潛點",
    witness: "目擊動態",
  },
  en: {
    code: "en",
    localeButton: "TW",
    sound: "Sound",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    menuContact: "Contact us —",
    menuFollow: "Follow us —",
    navLabels: [
      "Turtle Map",
      "Articles",
      "About Us",
      "Education Resources",
      "Report Sightings",
    ],
    factLabels: [
      "Name",
      "Species",
      "Age",
      "Shell pattern",
      "Right facial scales",
      "Left facial scales",
      "Named by",
      "Reported by",
      "Features",
    ],
    leftFace: "Left face:",
    rightFace: "Right face:",
    favoriteDive: "Favorite dive site",
    witness: "Witness story",
  },
} as const;

type Locale = keyof typeof dictionaries;
type Dictionary = (typeof dictionaries)[Locale];

const fallbackActivity: Activity = {
  title: "花瓶岩到美人洞",
  description: null,
  post_link: null,
  date: "2018-05-14",
};
const fallbackActivities = [fallbackActivity];

const carouselImages = [
  {
    alt: "Sea turtle swimming over coral",
    src: "/images/turtle-carousel-hero.png",
  },
  {
    alt: "Left turtle face",
    src: "/images/turtle-carousel-left.jpg",
  },
  {
    alt: "Right turtle face",
    src: "/images/turtle-carousel-right.jpg",
  },
] as const;

const witnessIndicatorCount = 10;
const carouselAutoplayDelay = 5000;
const carouselAnimationDuration = 650;
const maxDescriptionChars = 28;
type CarouselDirection = "next" | "previous";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const assetPath = (path: string) => `${basePath}${path}`;

export function TurtleSpotPage({ activities }: { activities: Activity[] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [locale, setLocale] = useState<Locale>("zh");
  const [clientActivities, setClientActivities] = useState(activities);
  const dictionary = dictionaries[locale];
  const displayActivities =
    clientActivities.length > 0 ? clientActivities : fallbackActivities;

  useEffect(() => {
    document.documentElement.lang = dictionary.code;
  }, [dictionary.code]);

  useEffect(() => {
    let isMounted = true;

    getActivities().then((nextActivities) => {
      if (isMounted && nextActivities.length > 0) {
        setClientActivities(sortActivitiesByDateDesc(nextActivities));
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[#AAF5FA] text-[#161616]">
      <Header
        dictionary={dictionary}
        isMenuOpen={isMenuOpen}
        onLocaleToggle={() =>
          setLocale((current) => (current === "zh" ? "en" : "zh"))
        }
        onMenuToggle={() => setIsMenuOpen((open) => !open)}
      />
      <MenuOverlay dictionary={dictionary} isOpen={isMenuOpen} />

      <HeroSection dictionary={dictionary} />
      <PhotoCarousel />
      <DiveSites dictionary={dictionary} />
      <WitnessStory activities={displayActivities} dictionary={dictionary} />
      <Footer />
    </main>
  );
}

function Header({
  dictionary,
  isMenuOpen,
  onLocaleToggle,
  onMenuToggle,
}: {
  dictionary: Dictionary;
  isMenuOpen: boolean;
  onLocaleToggle: () => void;
  onMenuToggle: () => void;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isSoundMuted, setIsSoundMuted] = useState(true);

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
    <header className="fixed inset-x-0 top-0 z-50 flex h-14 items-start justify-between max-xl:h-10 max-sm:h-8">
      <audio
        ref={audioRef}
        loop
        preload="none"
        src={assetPath("/audio/ambient-loop.ogg")}
      />
      <div
        className={`flex h-14 items-center gap-2.5 whitespace-nowrap pl-5 text-[18px] font-black tracking-[-0.01em] transition-colors max-xl:h-10 max-xl:gap-2 max-xl:text-[12px] max-sm:h-8 max-sm:pl-3 max-sm:text-[11px] ${
          isMenuOpen ? "text-[#F5FDFF]" : "text-[#161616]"
        }`}
      >
        <FocusIcon className="h-6 w-6 shrink-0 max-xl:h-4 max-xl:w-4 max-sm:h-4 max-sm:w-4" />
        <span>Turtle Spot Taiwan</span>
      </div>

      <div className="flex h-14 items-stretch text-[#F5FDFF] max-xl:h-10 max-sm:h-8">
        <button
          aria-label="Toggle language"
          className="flex w-[60px] cursor-pointer items-center justify-center rounded-bl-xl bg-[#161616] text-[16px] font-black tracking-[0.08em] transition-[background-color,box-shadow,transform] hover:-translate-y-0.5 hover:bg-[#2C313B] hover:shadow-[0_8px_18px_rgba(0,0,0,0.24)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#AAF5FA] max-xl:w-10 max-xl:text-[13px] max-sm:w-8 max-sm:text-[12px]"
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
            <MutedSpeakerIcon className="h-5 w-5 max-xl:h-4 max-xl:w-4 max-sm:h-3.5 max-sm:w-3.5" />
          ) : (
            <SpeakerIcon className="h-5 w-5 max-xl:h-4 max-xl:w-4 max-sm:h-3.5 max-sm:w-3.5" />
          )}
        </IconButton>
        <button
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? dictionary.closeMenu : dictionary.openMenu}
          className="flex w-[132px] cursor-pointer items-center justify-center gap-2 bg-[#161616] text-[11px] font-black tracking-[0.18em] transition-[background-color,box-shadow,transform] hover:-translate-y-0.5 hover:bg-[#2C313B] hover:shadow-[0_8px_18px_rgba(0,0,0,0.24)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#AAF5FA] max-xl:w-10 max-xl:gap-0 max-sm:w-8"
          onClick={onMenuToggle}
          type="button"
        >
          {isMenuOpen ? (
            <CloseIcon className="h-5 w-5 max-xl:h-4 max-xl:w-4 max-sm:h-3.5 max-sm:w-3.5" />
          ) : (
            <MenuIcon className="h-4 w-6 max-xl:h-3.5 max-xl:w-5 max-sm:h-3 max-sm:w-4" />
          )}
          <span className="max-xl:hidden">MENU</span>
        </button>
      </div>
    </header>
  );
}

function MenuOverlay({
  dictionary,
  isOpen,
}: {
  dictionary: Dictionary;
  isOpen: boolean;
}) {
  const compactMenu = dictionary.code === "en";

  return (
    <div
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-40 bg-[#00CAD7] transition-[opacity,visibility] duration-300 ${
        isOpen
          ? "visible opacity-100"
          : "invisible pointer-events-none opacity-0"
      }`}
    >
      <div className="overflow-hidden rounded-b-[40px] bg-[#161616] text-[#F5FDFF] max-xl:rounded-b-[28px]">
        <div className="mx-auto flex min-h-[560px] max-w-[1440px] flex-col px-20 pb-24 pt-44 max-xl:min-h-screen max-xl:px-10 max-xl:pb-16 max-xl:pt-28 max-sm:px-6">
          <nav
            className={`flex items-start justify-center max-xl:grid max-xl:grid-cols-1 max-xl:gap-7 ${
              compactMenu ? "gap-10 max-xl:gap-7" : "gap-20 max-xl:gap-14"
            }`}
          >
            {navItems.map((item, index) => (
              <a
                className="group block transition-transform hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#AAF5FA] max-xl:hover:translate-x-1 max-xl:hover:translate-y-0"
                href="#"
                key={item.title}
              >
                <span
                  className={`block whitespace-nowrap text-2xl font-black tracking-[0.04em] transition-colors group-hover:text-[#AAF5FA] max-xl:text-lg ${
                    item.active ? "text-[#AAF5FA]" : "text-[#F5FDFF]"
                  }`}
                >
                  {dictionary.navLabels[index]}
                </span>
                <span
                  className={`mt-3 block whitespace-nowrap font-black leading-none tracking-[-0.01em] transition-colors group-hover:text-[#AAF5FA] max-xl:hidden ${
                    item.active ? "text-[#AAF5FA]" : "text-[#F5FDFF]"
                  } ${compactMenu ? "text-[40px] max-xl:text-[36px]" : "text-[48px]"}`}
                >
                  {item.title}
                </span>
              </a>
            ))}
          </nav>

          <div className="mt-28 grid max-w-[920px] grid-cols-2 gap-32 max-xl:mt-14 max-xl:grid-cols-1 max-xl:gap-10">
            <div>
              <p className="text-2xl font-black text-[#BFC8CA] max-xl:text-lg">
                {dictionary.menuContact}
              </p>
              <p className="mt-6 text-4xl font-black tracking-[-0.02em] max-xl:mt-3 max-xl:text-2xl">
                info@gmail.com
              </p>
            </div>
            <div>
              <p className="text-2xl font-black text-[#BFC8CA] max-xl:text-lg">
                {dictionary.menuFollow}
              </p>
              <p className="mt-6 whitespace-nowrap text-4xl font-black tracking-[-0.02em] max-xl:mt-3 max-xl:text-2xl">
                facebook / instagram
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroSection({ dictionary }: { dictionary: Dictionary }) {
  return (
    <section className="relative min-h-[1424px] overflow-hidden bg-[#AAF5FA] max-xl:min-h-[1180px] max-sm:min-h-[1580px]">
      <MarqueeText
        className="top-[236px] text-[190px] text-[#F5FDFF]/80 max-xl:top-[161px] max-xl:text-[88px] max-sm:top-[190px]"
        text="Information Information"
      />

      <div className="absolute left-1/2 top-[clamp(88px,10vw,144px)] z-10 aspect-square w-[clamp(240px,41.667vw,400px)] -translate-x-1/2 overflow-hidden rounded-full border-[6px] border-[#F5FDFF] bg-[#E5EEF0] max-sm:top-[120px]">
        <Image
          alt="Sea turtle swimming over coral"
          className="object-cover"
          fill
          loading="eager"
          priority
          sizes="(max-width: 767px) 240px, (max-width: 1279px) 320px, 400px"
          src={assetPath("/images/turtle-hero.jpg")}
        />
      </div>

      <TurtleProfileCard dictionary={dictionary} />
    </section>
  );
}

function TurtleProfileCard({ dictionary }: { dictionary: Dictionary }) {
  return (
    <section className="relative z-20 mx-auto mt-[687px] w-[min(922px,calc(100vw_-_80px))] max-xl:mt-[clamp(486px,52vw,630px)] max-sm:mx-0 max-sm:mt-[470px] max-sm:w-full">
      <div className="absolute -top-[63px] left-0 flex h-[63px] w-[315px] items-center whitespace-nowrap rounded-t-2xl bg-[#E5EEF0] px-10 text-[18px] font-black max-xl:-top-14 max-xl:h-14 max-xl:w-full max-xl:px-6 max-xl:text-base">
        淡定哥&nbsp;&nbsp; #TW01HOO84
      </div>
      <div className="bg-white px-10 pb-10 pt-10 shadow-[0_1px_0_rgba(0,0,0,0.02)] max-xl:px-6">
        <div className="grid grid-cols-2 gap-x-6 gap-y-6 max-sm:grid-cols-1">
          {turtleFacts.map((fact, index) => (
            <div
              className={`border-b border-[#AAF5FA] pb-4 text-[15px] font-black leading-6 max-xl:text-sm ${
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
          <ProfilePhoto
            alt="Left turtle face"
            label={dictionary.leftFace}
            src={assetPath("/images/turtle-left.jpg")}
          />
          <ProfilePhoto
            alt="Right turtle face"
            label={dictionary.rightFace}
            src={assetPath("/images/turtle-right.jpg")}
          />
        </div>
      </div>
    </section>
  );
}

function ProfilePhoto({
  alt,
  label,
  src,
}: {
  alt: string;
  label: string;
  src: string;
}) {
  return (
    <div>
      <p className="mb-4 text-[15px] font-black">{label}</p>
      <div className="relative aspect-[409/262] overflow-hidden rounded bg-[#E5EEF0]">
        <Image
          alt={alt}
          className="object-cover"
          fill
          sizes="409px"
          src={src}
        />
      </div>
      <div className="mt-5 h-px bg-[#AAF5FA]" />
    </div>
  );
}

function MarqueeText({ className, text }: { className: string; text: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 z-0 overflow-hidden whitespace-nowrap font-black leading-none tracking-normal ${className}`}
    >
      <div className="flex w-max animate-marquee-left">
        <span className="shrink-0 pr-20">{text}</span>
        <span className="shrink-0 pr-20">{text}</span>
      </div>
    </div>
  );
}

function PhotoCarousel() {
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
  const desktopPanelClass =
    "left-1/2 top-0 aspect-[706/529] w-[min(706px,calc(100vw_-_80px))] max-lg:hidden";
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
    <section className="relative overflow-hidden rounded-b-[40px] bg-[#E5EEF0] pb-20 pt-[120px] max-lg:py-20 max-md:rounded-b-[28px]">
      <div className="relative mx-auto h-[590px] max-w-[1440px] max-lg:h-auto max-lg:px-6">
        {slideAnimation ? (
          <>
            {animationFillIndex !== null ? (
              <CarouselImage
                className={desktopPanelClass}
                image={carouselImages[animationFillIndex]}
                isActive={false}
                motionClass={
                  slideAnimation.direction === "next"
                    ? "carousel-desktop-right"
                    : "carousel-desktop-left"
                }
                sizes="706px"
              />
            ) : null}
            <CarouselImage
              className={desktopPanelClass}
              image={carouselImages[slideAnimation.from]}
              isActive
              motionClass={
                slideAnimation.direction === "next"
                  ? "animate-carousel-center-to-left"
                  : "animate-carousel-center-to-right"
              }
              sizes="706px"
            />
            <CarouselImage
              className={desktopPanelClass}
              image={carouselImages[slideAnimation.to]}
              isActive
              motionClass={
                slideAnimation.direction === "next"
                  ? "animate-carousel-right-to-center"
                  : "animate-carousel-left-to-center"
              }
              sizes="706px"
            />
          </>
        ) : (
          <>
            <CarouselImage
              className={desktopPanelClass}
              image={carouselImages[previousIndex]}
              isActive={false}
              motionClass="carousel-desktop-left"
              sizes="706px"
            />
            <CarouselImage
              className={desktopPanelClass}
              image={carouselImages[activeIndex]}
              isActive
              motionClass="carousel-desktop-center"
              sizes="706px"
            />
            <CarouselImage
              className={desktopPanelClass}
              image={carouselImages[nextIndex]}
              isActive={false}
              motionClass="carousel-desktop-right"
              sizes="706px"
            />
          </>
        )}
        <CarouselImage
          className="hidden max-lg:relative max-lg:left-auto max-lg:top-0 max-lg:mx-auto max-lg:block max-lg:aspect-[688/524] max-lg:w-[calc(98.039vw_-_78.431px)] max-lg:max-w-[675px] max-md:aspect-[327/249] max-md:w-[calc(98.039vw_-_47.059px)] max-md:max-w-none"
          image={carouselImages[activeIndex]}
          isActive
          key={activeIndex}
          motionClass="scale-[1.02] opacity-100 animate-carousel-fade"
          sizes="(max-width: 1279px) calc(100vw - 48px), 706px"
        />

        <ArrowButton
          className="left-[calc(50%_-_504px)] top-[238px] max-lg:hidden"
          direction="left"
          onClick={() =>
            goToSlide(
              (index) =>
                (index + carouselImages.length - 1) % carouselImages.length,
              "previous",
            )
          }
        />
        <ArrowButton
          className="right-[calc(50%_-_504px)] top-[238px] max-lg:hidden"
          direction="right"
          onClick={() =>
            goToSlide(
              (index) => (index + 1) % carouselImages.length,
              "next",
            )
          }
        />

        <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 gap-3 max-lg:hidden">
          {carouselImages.map((image, dot) => (
            <button
              aria-label={`${image.alt} slide`}
              aria-current={dot === activeIndex}
              className={`h-[10px] cursor-pointer rounded-full transition-[width,background-color,transform] hover:scale-125 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#161616] ${
                dot === activeIndex
                  ? "w-6 bg-[#161616]"
                  : "w-[10px] bg-[#F5FDFF]"
              }`}
              key={image.src}
              onClick={() => goToSlide(dot)}
              type="button"
            />
          ))}
        </div>

        <div className="mt-8 hidden items-center justify-center gap-7 max-lg:flex max-md:mt-9 max-md:gap-5">
          <ArrowButton
            className="!static !translate-y-0"
            direction="left"
            onClick={() =>
              goToSlide(
                (index) =>
                  (index + carouselImages.length - 1) % carouselImages.length,
                "previous",
              )
            }
          />
          <div className="flex items-center gap-3">
            {carouselImages.map((image, dot) => (
              <button
                aria-label={`${image.alt} slide`}
                aria-current={dot === activeIndex}
                className={`h-[10px] cursor-pointer rounded-full transition-[width,background-color,transform] hover:scale-125 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#161616] ${
                  dot === activeIndex
                    ? "w-6 bg-[#161616]"
                    : "w-[10px] bg-[#F5FDFF]"
                }`}
                key={image.src}
                onClick={() => goToSlide(dot)}
                type="button"
              />
            ))}
          </div>
          <ArrowButton
            className="!static !translate-y-0"
            direction="right"
            onClick={() =>
              goToSlide(
                (index) => (index + 1) % carouselImages.length,
                "next",
              )
            }
          />
        </div>
      </div>
    </section>
  );
}

function CarouselImage({
  className,
  image,
  isActive,
  motionClass,
  sizes,
}: {
  className: string;
  image: (typeof carouselImages)[number];
  isActive: boolean;
  motionClass?: string;
  sizes: string;
}) {
  return (
    <div
      className={`absolute overflow-hidden rounded-2xl bg-[#AAF5FA] transition-[opacity,transform] duration-700 ease-out ${
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
}

function DiveSites({ dictionary }: { dictionary: Dictionary }) {
  return (
    <section className="relative overflow-hidden rounded-b-[40px] bg-[#161616] max-xl:rounded-b-[28px]">
      <MarqueeText
        className="top-[345px] text-[150px] text-[#515665]/80 max-xl:top-[324px] max-xl:text-[112px] max-md:top-[300px] max-md:text-[72px]"
        text="Favorite Dive Sites Favorite Dive Sites"
      />
      <div className="relative z-10 min-h-[840px] max-xl:min-h-[760px] max-sm:min-h-[620px]">
        <PinMarker
          className="left-[12vw] top-24 max-xl:left-[120px] max-xl:top-[50px] max-sm:left-1/2 max-sm:top-[-32px] max-sm:-translate-x-1/2"
          color="#AAF5FA"
          label={dictionary.favoriteDive}
          title="花瓶岩"
        />
        <PinMarker
          className="right-[18vw] top-[374px] max-xl:right-[80px] max-xl:top-[340px] max-sm:left-1/2 max-sm:right-auto max-sm:top-[230px] max-sm:-translate-x-1/2"
          color="#F5FDFF"
          label={dictionary.favoriteDive}
          title="美人洞"
        />
      </div>
    </section>
  );
}

function PinMarker({
  className,
  color,
  label,
  title,
}: {
  className: string;
  color: string;
  label: string;
  title: string;
}) {
  return (
    <div
      className={`absolute h-[370px] w-[286px] max-xl:scale-75 max-sm:scale-[0.6] ${className}`}
    >
      <svg
        aria-hidden="true"
        className="absolute left-0 top-0 h-[326px] w-[286px] overflow-visible"
        fill="none"
        viewBox="0 0 286 326"
      >
        <path
          d="M143 0C64 0 0 64 0 143c0 43 16 76 48 108l95 95 95-95c32-32 48-65 48-108C286 64 222 0 143 0Z"
          fill={color}
        />
      </svg>
      <div className="absolute left-0 top-0 flex h-[286px] w-[286px] flex-col items-center justify-center text-center">
        <span className="text-sm font-black">{label}</span>
        <strong className="mt-4 text-4xl font-black tracking-[-0.03em]">
          {title}
        </strong>
      </div>
      <div
        className="absolute -bottom-5 left-1/2 h-[28px] w-[92px] -translate-x-1/2 rounded-[50%]"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}

function WitnessStory({
  activities,
  dictionary,
}: {
  activities: Activity[];
  dictionary: Dictionary;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activity = activities[activeIndex] ?? fallbackActivity;
  const activeIndicatorIndex = activeIndex % witnessIndicatorCount;
  const selectIndicator = (index: number) => {
    setActiveIndex(index % activities.length);
  };

  return (
    <section className="relative min-h-[760px] overflow-hidden bg-[#AAF5FA] max-xl:min-h-[760px] max-md:min-h-[528px]">
      <MarqueeText
        className="top-[344px] text-[154px] text-[#F5FDFF]/85 max-xl:top-[334px] max-xl:text-[118px] max-md:top-[250px] max-md:text-[72px]"
        text="Witness Story Witness Story"
      />

      <div className="relative mx-auto h-[760px] max-w-[1440px] max-xl:h-[760px] max-md:h-[528px]">
        <ArrowButton
          className="left-[max(16px,calc(50%_-_360px))] top-[420px] max-md:hidden"
          direction="left"
          onClick={() =>
            setActiveIndex((index) =>
              index === 0 ? activities.length - 1 : index - 1,
            )
          }
          size="small"
        />
        <WitnessPhone
          activeIndicatorIndex={activeIndicatorIndex}
          activity={activity}
          dictionary={dictionary}
          onSelectIndicator={selectIndicator}
        />
        <ArrowButton
          className="right-[max(16px,calc(50%_-_360px))] top-[420px] max-md:hidden"
          direction="right"
          onClick={() =>
            setActiveIndex((index) => (index + 1) % activities.length)
          }
          size="small"
        />
      </div>
    </section>
  );
}

function WitnessPhone({
  activeIndicatorIndex,
  activity,
  dictionary,
  onSelectIndicator,
}: {
  activeIndicatorIndex: number;
  activity: Activity;
  dictionary: Dictionary;
  onSelectIndicator: (index: number) => void;
}) {
  const description = activity.description
    ? truncateDescription(activity.description)
    : null;

  return (
    <article className="absolute left-1/2 top-20 h-[min(680px,132.3vw)] w-[min(560px,83vw)] -translate-x-1/2 rounded-t-[40px] bg-[#161616] text-center text-[#F5FDFF] max-md:top-8">
      <div className="absolute left-[7%] right-[7%] top-[4.5%] h-16 max-md:h-12">
        <div className="absolute inset-x-0 top-0 flex gap-3 max-xl:gap-2 max-md:gap-2">
          {Array.from({ length: witnessIndicatorCount }, (_, index) => (
            <button
              aria-label={`Show witness story ${index + 1}`}
              aria-current={index === activeIndicatorIndex ? "true" : "false"}
              className={`h-[3px] flex-1 cursor-pointer rounded-full transition-[background-color,transform] hover:scale-y-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#AAF5FA] ${
                index === activeIndicatorIndex ? "bg-[#AAF5FA]" : "bg-[#363841]"
              }`}
              key={index}
              onClick={() => onSelectIndicator(index)}
              type="button"
            />
          ))}
        </div>
        <div className="absolute left-0 top-[48%] flex items-center gap-3 whitespace-nowrap text-[15px] font-black text-[#7E8593] max-md:gap-2 max-md:text-[11px]">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F5FDFF] text-[#161616] max-md:h-7 max-md:w-7">
            <FocusIcon className="h-6 w-6 max-md:h-5 max-md:w-5" />
          </span>
          <span>{dictionary.witness}</span>
        </div>
      </div>

      <time className="absolute inset-x-0 top-[25.3%] text-[28px] font-black max-md:text-[18px]">
        {formatActivityDate(activity.date)}
      </time>
      <div className="absolute left-1/2 top-[36.8%] flex w-[min(440px,78%)] -translate-x-1/2 flex-col items-center gap-4 text-[#161616] max-md:w-[min(260px,calc(100%_-_48px))] max-md:gap-4">
        <h2 className="max-w-full bg-[#F5FDFF] px-4 py-2.5 text-[22px] font-black leading-tight max-md:px-3 max-md:py-2 max-md:text-base">
          {activity.title}
        </h2>
        {description ? (
          <p className="max-w-full overflow-hidden bg-[#F5FDFF] px-4 py-3 text-lg font-black leading-[1.35] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] max-md:px-3 max-md:py-2 max-md:text-base">
            {description}
          </p>
        ) : null}
      </div>

      <a
        className={`absolute bottom-[12%] left-1/2 inline-flex h-12 -translate-x-1/2 items-center justify-center rounded-full bg-[#AAF5FA] px-8 text-sm font-black text-[#161616] transition-colors hover:bg-[#F5FDFF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F5FDFF] max-md:bottom-[10%] max-md:h-10 max-md:px-5 max-md:text-xs ${
          activity.post_link ? "" : "pointer-events-none opacity-70"
        }`}
        href={activity.post_link ?? "#"}
        rel="noreferrer"
        target={activity.post_link ? "_blank" : undefined}
      >
        VIEW POST
      </a>
    </article>
  );
}

function truncateDescription(description: string) {
  const normalized = description.replace(/\s+/g, " ").trim();

  if (normalized.length <= maxDescriptionChars) {
    return normalized;
  }

  return `${normalized.slice(0, maxDescriptionChars)}...`;
}

function Footer() {
  return (
    <footer className="h-[420px] bg-[#00CAD7] px-20 py-14 text-[#161616] max-lg:h-[392px] max-lg:px-6 max-lg:py-10 max-sm:px-4">
      <div className="mx-auto grid max-w-[1280px] grid-cols-[1fr_220px_220px] gap-20 max-lg:block">
        <div>
          <h2 className="text-[32px] font-black tracking-[-0.02em] max-lg:text-[20px]">
            Turtle Spot Taiwan
          </h2>
          <p className="mt-[178px] text-xs font-black max-lg:mt-3">
            © 2021 Turtle Spot Taiwan
          </p>
        </div>

        <div className="pt-12 text-sm font-black leading-6 max-lg:mt-10 max-lg:pt-0 max-lg:text-left max-lg:leading-5">
          <p className="max-lg:hidden">contact us：</p>
          <a
            className="block transition-colors hover:text-[#F5FDFF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5FDFF]"
            href="mailto:tstservice@gmail.com"
          >
            tstservice@gmail.com
          </a>
          <a
            className="block transition-colors hover:text-[#F5FDFF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5FDFF] max-lg:mt-3"
            href="#"
          >
            Facebook
          </a>
          <a
            className="block transition-colors hover:text-[#F5FDFF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5FDFF] max-lg:mt-3"
            href="#"
          >
            Instagram
          </a>
        </div>

        <div className="pt-12 text-sm font-black max-lg:hidden">
          <p>sponsor：</p>
          <Image
            alt="Keep Walking Fund sponsor logo"
            className="mt-3 h-auto w-[136px]"
            height={122}
            src={assetPath("/images/sponsor-logo.png")}
            width={136}
          />
        </div>
      </div>
    </footer>
  );
}

function ArrowButton({
  className,
  direction,
  onClick,
  size = "default",
}: {
  className: string;
  direction: "left" | "right";
  onClick: () => void;
  size?: "default" | "small";
}) {
  const buttonSize =
    size === "small"
      ? "h-[44px] w-[44px] max-md:h-10 max-md:w-10"
      : "h-16 w-16 max-md:h-12 max-md:w-12";
  const iconSize = size === "small" ? "h-[18px] w-[18px]" : "h-6 w-6";

  return (
    <button
      aria-label={direction === "left" ? "Previous" : "Next"}
      className={`absolute z-20 flex ${buttonSize} -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[#161616] text-[#F5FDFF] shadow-[0_4px_4px_rgba(0,0,0,0.25)] transition-[background-color,box-shadow,transform] hover:scale-110 hover:bg-[#2C313B] hover:shadow-[0_10px_22px_rgba(0,0,0,0.35)] hover:ring-4 hover:ring-[#AAF5FA]/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#AAF5FA] ${className}`}
      onClick={onClick}
      type="button"
    >
      <ArrowIcon
        className={direction === "left" ? `${iconSize} rotate-180` : iconSize}
      />
    </button>
  );
}

function IconButton({
  children,
  label,
  onClick,
  pressed,
}: {
  children: ReactNode;
  label: string;
  onClick?: () => void;
  pressed?: boolean;
}) {
  return (
    <button
      aria-label={label}
      aria-pressed={pressed}
      className="flex w-[56px] cursor-pointer items-center justify-center border-l border-[#363841] bg-[#161616] transition-[background-color,box-shadow,transform] hover:-translate-y-0.5 hover:bg-[#2C313B] hover:shadow-[0_8px_18px_rgba(0,0,0,0.24)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#AAF5FA] max-xl:w-10 max-sm:w-8"
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

function FocusIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 32 32"
    >
      <path
        d="M4 12V7a3 3 0 0 1 3-3h5M20 4h5a3 3 0 0 1 3 3v5M28 20v5a3 3 0 0 1-3 3h-5M12 28H7a3 3 0 0 1-3-3v-5"
        stroke="currentColor"
        strokeLinecap="square"
        strokeWidth="3"
      />
    </svg>
  );
}

function SpeakerIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 32 32"
    >
      <path
        d="M5 13h6l7-6v18l-7-6H5v-6Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="3"
      />
      <path
        d="M22 11c2 2 2 8 0 10M25 8c4 4 4 12 0 16"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="3"
      />
    </svg>
  );
}

function MutedSpeakerIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 32 32"
    >
      <path
        d="M5 13h6l7-6v18l-7-6H5v-6Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="3"
      />
      <path
        d="m23 12 6 8M29 12l-6 8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="3"
      />
    </svg>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 28 20"
    >
      <path d="M4 6h20M4 14h20" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 32 32"
    >
      <path
        d="m7 7 18 18M25 7 7 25"
        stroke="currentColor"
        strokeLinecap="square"
        strokeWidth="3"
      />
    </svg>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 9 14"
    >
      <path d="m1 13 6-6-6-6" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
