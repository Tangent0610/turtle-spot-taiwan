export const MarqueeText = ({
  className,
  text,
}: {
  className: string;
  text: string;
}) => (
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
