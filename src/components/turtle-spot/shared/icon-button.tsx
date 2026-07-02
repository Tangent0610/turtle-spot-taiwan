import type { ReactNode } from "react";
import { headerControlClass } from "@/components/turtle-spot/styles";

export const IconButton = ({
  children,
  label,
  onClick,
  pressed,
}: {
  children: ReactNode;
  label: string;
  onClick?: () => void;
  pressed?: boolean;
}) => (
  <button
    aria-label={label}
    aria-pressed={pressed}
    className={`flex w-[56px] items-center justify-center border-l border-turtle-divider max-lg:w-10 ${headerControlClass}`}
    onClick={onClick}
    type="button"
  >
    {children}
  </button>
);
