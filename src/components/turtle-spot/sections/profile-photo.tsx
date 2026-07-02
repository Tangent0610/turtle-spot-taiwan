import Image from "next/image";
import { assetPath, imageSizes } from "@/config/assets";

export const ProfilePhoto = ({
  alt,
  label,
  src,
}: {
  alt: string;
  label: string;
  src: string;
}) => (
  <div>
    <p className="mb-4 text-[15px] font-black">{label}</p>
    <div className="relative aspect-[409/262] overflow-hidden rounded bg-turtle-panel">
      <Image
        alt={alt}
        className="object-cover"
        fill
        sizes={imageSizes.profilePhoto}
        src={assetPath(src)}
      />
    </div>
    <div className="mt-5 h-px bg-turtle-aqua" />
  </div>
);
