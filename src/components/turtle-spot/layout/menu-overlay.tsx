"use client";

import { navItems } from "@/data/navigation";
import { fallbackLink } from "@/config/links";
import { useDictionary } from "@/components/turtle-spot/locale-context";

export const MenuOverlay = ({ isOpen }: { isOpen: boolean }) => {
  const dictionary = useDictionary();
  const compactMenu = dictionary.code === "en";

  return (
    <div
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-40 overflow-x-hidden bg-turtle-cyan transition-[opacity,visibility] duration-300 ${
        isOpen
          ? "visible opacity-100"
          : "invisible pointer-events-none opacity-0"
      }`}
    >
      <div className="overflow-hidden rounded-b-[40px] bg-turtle-ink text-turtle-white max-lg:rounded-b-[28px]">
        <div className="mx-auto flex min-h-[560px] w-full flex-col px-16 pb-24 pt-44 max-lg:min-h-screen max-lg:px-10 max-lg:pb-16 max-lg:pt-28 max-sm:px-6">
          <nav className="grid w-full grid-cols-5 items-start gap-7 max-lg:grid-cols-1 max-lg:gap-7">
            {navItems.map((item, index) => (
              <a
                className="group block min-w-0 transition-transform hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turtle-aqua max-lg:hover:translate-x-1 max-lg:hover:translate-y-0"
                href={fallbackLink}
                key={item.title}
              >
                <span
                  className={`block whitespace-nowrap text-xl font-black tracking-[0.04em] transition-colors group-hover:text-turtle-aqua xl:text-2xl max-lg:text-lg ${
                    item.active ? "text-turtle-aqua" : "text-turtle-white"
                  }`}
                >
                  {dictionary.navLabels[index]}
                </span>
                <span
                  className={`mt-3 block whitespace-nowrap font-black leading-none tracking-[-0.01em] transition-colors group-hover:text-turtle-aqua max-lg:hidden ${
                    item.active ? "text-turtle-aqua" : "text-turtle-white"
                  } ${
                    compactMenu
                      ? "text-[clamp(28px,2.4vw,40px)]"
                      : item.title === "Report Sightings"
                        ? "text-[clamp(26px,2.2vw,40px)]"
                        : "text-[clamp(28px,2.6vw,48px)]"
                  }`}
                >
                  {item.title}
                </span>
              </a>
            ))}
          </nav>

          <div className="mt-28 grid max-w-[920px] grid-cols-2 gap-32 max-lg:mt-14 max-lg:grid-cols-1 max-lg:gap-10">
            <div>
              <p className="text-2xl font-black text-turtle-menu-muted max-lg:text-lg">
                {dictionary.menuContact}
              </p>
              <p className="mt-6 text-4xl font-black tracking-[-0.02em] max-lg:mt-3 max-lg:text-2xl">
                info@gmail.com
              </p>
            </div>
            <div>
              <p className="text-2xl font-black text-turtle-menu-muted max-lg:text-lg">
                {dictionary.menuFollow}
              </p>
              <div className="mt-6 flex whitespace-nowrap text-4xl font-black tracking-[-0.02em] max-lg:mt-3 max-lg:text-2xl">
                <a
                  className="transition-colors hover:text-turtle-aqua focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turtle-aqua"
                  href={fallbackLink}
                >
                  facebook
                </a>
                <span className="px-2">/</span>
                <a
                  className="transition-colors hover:text-turtle-aqua focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turtle-aqua"
                  href={fallbackLink}
                >
                  instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
