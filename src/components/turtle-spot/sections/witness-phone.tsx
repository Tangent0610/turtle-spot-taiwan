"use client";

import { maxDescriptionChars, witnessIndicatorCount } from "@/config/ui";
import { fallbackLink } from "@/config/links";
import { formatActivityDate, type Activity } from "@/lib/activity-utils";
import { FocusIcon } from "@/components/turtle-spot/icons";
import { useDictionary } from "@/components/turtle-spot/locale-context";

const truncateDescription = (description: string) => {
  const normalized = description.replace(/\s+/g, " ").trim();

  if (normalized.length <= maxDescriptionChars) {
    return normalized;
  }

  return `${normalized.slice(0, maxDescriptionChars)}...`;
};

export const WitnessPhone = ({
  activeIndicatorIndex,
  activity,
  onSelectIndicator,
}: {
  activeIndicatorIndex: number;
  activity: Activity;
  onSelectIndicator: (index: number) => void;
}) => {
  const dictionary = useDictionary();
  const description = activity.description
    ? truncateDescription(activity.description)
    : null;

  return (
    <article className="flex h-[min(680px,132.3vw)] w-[min(560px,83vw)] flex-col rounded-t-[40px] bg-turtle-ink px-6 pt-5 text-center text-turtle-white max-xl:px-[5.5%] max-xl:pt-[4.5%]">
      <div>
        <div className="flex gap-3 max-xl:gap-2 max-md:gap-2">
          {Array.from({ length: witnessIndicatorCount }, (_, index) => (
            <button
              aria-label={`Show witness story ${index + 1}`}
              aria-current={index === activeIndicatorIndex ? "true" : "false"}
              className={`h-[3px] flex-1 cursor-pointer rounded-full transition-[background-color,transform] hover:scale-y-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turtle-aqua ${
                index === activeIndicatorIndex
                  ? "bg-turtle-aqua"
                  : "bg-turtle-divider"
              }`}
              key={index}
              onClick={() => onSelectIndicator(index)}
              type="button"
            />
          ))}
        </div>
        <div className="mt-4 flex items-center gap-3 whitespace-nowrap text-[15px] font-black text-turtle-muted max-md:gap-2 max-md:text-[11px]">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-turtle-white text-turtle-ink max-md:h-7 max-md:w-7">
            <FocusIcon className="h-6 w-6 max-md:h-5 max-md:w-5" />
          </span>
          <span>{dictionary.witness}</span>
        </div>
      </div>

      <time className="mt-[13%] text-[28px] font-black max-md:mt-[12%] max-md:text-[18px]">
        {formatActivityDate(activity.date)}
      </time>
      <div className="mx-auto mt-[8%] flex w-[min(440px,100%)] flex-col items-center gap-4 text-turtle-ink max-md:w-[min(260px,100%)] max-md:gap-4">
        <h2 className="max-w-full bg-turtle-white px-4 py-2.5 text-[22px] font-black leading-tight max-md:px-3 max-md:py-2 max-md:text-base">
          {activity.title}
        </h2>
        {description ? (
          <p className="max-w-full overflow-hidden bg-turtle-white px-4 py-3 text-lg font-black leading-[1.35] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] max-md:px-3 max-md:py-2 max-md:text-base">
            {description}
          </p>
        ) : null}
      </div>

      <a
        className="mx-auto mb-[12%] mt-auto inline-flex h-12 items-center justify-center rounded-full bg-turtle-aqua px-8 text-sm font-black text-turtle-ink transition-colors hover:bg-turtle-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turtle-white max-md:mb-[10%] max-md:h-10 max-md:px-5 max-md:text-xs"
        href={activity.post_link ?? fallbackLink}
        rel="noreferrer"
        target="_blank"
      >
        VIEW POST
      </a>
    </article>
  );
};
