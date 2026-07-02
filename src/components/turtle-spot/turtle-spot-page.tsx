"use client";

import { useEffect, useState } from "react";
import { fallbackActivities } from "@/data/fallback-activities";
import { dictionaries, type Locale } from "@/i18n/dictionaries";
import { getActivities } from "@/lib/apollo";
import { sortActivitiesByDateDesc, type Activity } from "@/lib/activity-utils";
import { LocaleProvider } from "@/components/turtle-spot/locale-context";
import { Header } from "@/components/turtle-spot/layout/header";
import { MenuOverlay } from "@/components/turtle-spot/layout/menu-overlay";
import { DiveSites } from "@/components/turtle-spot/sections/dive-sites";
import { Footer } from "@/components/turtle-spot/sections/footer";
import { HeroSection } from "@/components/turtle-spot/sections/hero-section";
import { PhotoCarousel } from "@/components/turtle-spot/sections/photo-carousel";
import { WitnessStory } from "@/components/turtle-spot/sections/witness-story";

export const TurtleSpotPage = ({ activities }: { activities: Activity[] }) => {
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
    <LocaleProvider locale={locale}>
      <main className="min-h-screen overflow-hidden bg-turtle-aqua text-turtle-ink">
        <Header
          isMenuOpen={isMenuOpen}
          onLocaleToggle={() =>
            setLocale((current) => (current === "zh" ? "en" : "zh"))
          }
          onMenuToggle={() => setIsMenuOpen((open) => !open)}
        />
        <MenuOverlay isOpen={isMenuOpen} />
        <HeroSection />
        <PhotoCarousel />
        <DiveSites />
        <WitnessStory activities={displayActivities} />
        <Footer />
      </main>
    </LocaleProvider>
  );
};
