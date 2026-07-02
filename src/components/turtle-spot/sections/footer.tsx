import Image from "next/image";
import footerContent from "@/data/footer-content.json";
import { assetPath, imageAssets } from "@/config/assets";
import { footerLinkClass } from "@/components/turtle-spot/styles";

export const Footer = () => (
  <footer className="h-[420px] overflow-hidden bg-turtle-cyan px-20 py-14 text-turtle-ink max-lg:h-[392px] max-lg:px-6 max-lg:pb-6 max-lg:pt-14 max-sm:px-4 max-sm:pt-12">
    <div className="mx-auto grid max-w-[1280px] grid-cols-[1fr_220px_220px] gap-20 max-lg:block">
      <div>
        <h2 className="text-[32px] font-black tracking-[-0.02em] max-lg:text-[28px] max-sm:text-[24px]">
          {footerContent.siteName}
        </h2>
        <p className="mt-[178px] text-xs font-black max-lg:mt-6 max-lg:text-sm">
          {footerContent.copyright}
        </p>
      </div>

      <div className="pt-12 text-sm font-black leading-6 max-lg:mt-9 max-lg:pt-0 max-lg:text-left max-lg:text-[15px] max-lg:leading-6 max-sm:text-sm">
        <p className="max-lg:hidden">{footerContent.contactLabel}</p>
        {footerContent.links.map((link, index) => (
          <a
            className={`${footerLinkClass} ${
              index === 0 ? "mt-3 max-lg:mt-8" : "mt-2 max-lg:mt-1"
            }`}
            href={link.href}
            key={link.label}
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="pt-12 text-sm font-black max-lg:hidden">
        <p>{footerContent.sponsorLabel}</p>
        <Image
          alt={footerContent.sponsor.alt}
          className="mt-3 h-auto w-[136px]"
          height={122}
          src={assetPath(imageAssets.sponsorLogo)}
          width={136}
        />
      </div>
    </div>
  </footer>
);
