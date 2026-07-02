export const PinMarker = ({
  className,
  colorClass,
  label,
  title,
}: {
  className: string;
  colorClass: string;
  label: string;
  title: string;
}) => (
  <div
    className={`absolute h-[370px] w-[286px] max-xl:scale-75 max-sm:scale-[0.6] ${className}`}
  >
    <svg
      aria-hidden="true"
      className={`absolute left-0 top-0 h-[326px] w-[286px] overflow-visible ${colorClass}`}
      fill="none"
      viewBox="0 0 286 326"
    >
      <path
        className="fill-current"
        d="M143 0C64 0 0 64 0 143c0 43 16 76 48 108l95 95 95-95c32-32 48-65 48-108C286 64 222 0 143 0Z"
      />
    </svg>
    <div className="absolute left-0 top-0 flex h-[286px] w-[286px] flex-col items-center justify-center text-center text-turtle-ink">
      <span className="text-sm font-black">{label}</span>
      <strong className="mt-4 text-4xl font-black tracking-[-0.03em]">
        {title}
      </strong>
    </div>
    <div
      className={`absolute -bottom-5 left-1/2 h-[28px] w-[92px] -translate-x-1/2 rounded-[50%] bg-current ${colorClass}`}
    />
  </div>
);
