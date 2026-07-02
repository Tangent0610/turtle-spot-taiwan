export const FocusIcon = ({ className }: { className?: string }) => (
  <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 32 32">
    <path
      d="M4 12V7a3 3 0 0 1 3-3h5M20 4h5a3 3 0 0 1 3 3v5M28 20v5a3 3 0 0 1-3 3h-5M12 28H7a3 3 0 0 1-3-3v-5"
      stroke="currentColor"
      strokeLinecap="square"
      strokeWidth="3"
    />
  </svg>
);

export const SpeakerIcon = ({ className }: { className?: string }) => (
  <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 32 32">
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

export const MutedSpeakerIcon = ({ className }: { className?: string }) => (
  <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 32 32">
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

export const MenuIcon = ({ className }: { className?: string }) => (
  <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 28 20">
    <path d="M4 6h20M4 14h20" stroke="currentColor" strokeWidth="3" />
  </svg>
);

export const CloseIcon = ({ className }: { className?: string }) => (
  <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 32 32">
    <path
      d="m7 7 18 18M25 7 7 25"
      stroke="currentColor"
      strokeLinecap="square"
      strokeWidth="3"
    />
  </svg>
);

export const ArrowIcon = ({ className }: { className?: string }) => (
  <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 9 14">
    <path d="m1 13 6-6-6-6" stroke="currentColor" strokeWidth="2" />
  </svg>
);
