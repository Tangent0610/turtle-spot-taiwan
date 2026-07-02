import { FocusIcon } from "@/components/turtle-spot/icons";

export const BrandLogo = ({
  className = "",
  isMenuOpen = false,
  trackHeaderTheme = false,
}: {
  className?: string;
  isMenuOpen?: boolean;
  trackHeaderTheme?: boolean;
}) => (
  <div
    data-header-brand={trackHeaderTheme ? "true" : undefined}
    data-menu-open={isMenuOpen ? "true" : "false"}
    className={`flex h-14 items-center gap-2.5 whitespace-nowrap pl-5 text-[18px] font-black tracking-[-0.01em] transition-colors max-lg:h-10 max-lg:gap-2 max-lg:text-[12px] max-sm:pl-2 max-sm:text-[12px] ${className}`}
  >
    <FocusIcon className="h-6 w-6 shrink-0 max-lg:h-4 max-lg:w-4 max-sm:h-5 max-sm:w-5" />
    <span>Turtle Spot Taiwan</span>
  </div>
);
