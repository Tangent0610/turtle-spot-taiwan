import { ArrowIcon } from "@/components/turtle-spot/icons";

export const ArrowButton = ({
  className,
  direction,
  onClick,
  placement = "absolute",
  size = "default",
}: {
  className?: string;
  direction: "left" | "right";
  onClick: () => void;
  placement?: "absolute" | "static";
  size?: "default" | "small";
}) => {
  const buttonSize =
    size === "small"
      ? "h-[44px] w-[44px] max-md:h-10 max-md:w-10"
      : "h-16 w-16 max-md:h-12 max-md:w-12";
  const iconSize = size === "small" ? "h-[18px] w-[18px]" : "h-6 w-6";
  const positionClass =
    placement === "absolute" ? "absolute -translate-y-1/2" : "relative";

  return (
    <button
      aria-label={direction === "left" ? "Previous" : "Next"}
      className={`z-20 flex ${buttonSize} ${positionClass} cursor-pointer items-center justify-center rounded-full bg-turtle-ink text-turtle-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] transition-[background-color,box-shadow,transform] hover:scale-110 hover:bg-turtle-hover hover:shadow-[0_10px_22px_rgba(0,0,0,0.35)] hover:ring-4 hover:ring-turtle-aqua/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turtle-aqua ${className ?? ""}`}
      onClick={onClick}
      type="button"
    >
      <ArrowIcon
        className={direction === "left" ? `${iconSize} rotate-180` : iconSize}
      />
    </button>
  );
};
