import Image from "next/image";
import footerContent from "@/data/footer-content.json";
import { assetPath, imageAssets } from "@/config/assets";
import { footerLinkClass } from "@/components/turtle-spot/styles";

export const Footer = () => (
  <footer className="h-[340px] overflow-hidden bg-turtle-cyan px-20 pb-8 pt-12 text-turtle-ink max-lg:h-[300px] max-lg:px-6 max-lg:pt-10 max-sm:h-[270px] max-sm:px-4 max-sm:pt-8">
    <div className="mx-auto grid max-w-[1280px] grid-cols-[1fr_220px_170px] gap-10 max-lg:block">
      <div>
        <h2 className="text-[32px] font-black tracking-[-0.02em] max-lg:text-[28px] max-sm:text-[24px]">
          {footerContent.siteName}
        </h2>
        <p className="mt-[112px] text-xs font-black max-lg:mt-2 max-lg:text-[12px]">
          {footerContent.copyright}
        </p>
      </div>

      <div className="pt-11 text-sm font-black leading-6 max-lg:mt-8 max-lg:pt-0 max-lg:text-left max-lg:text-[14px] max-lg:leading-5 max-sm:mt-7 max-sm:text-[13px]">
        <p className="max-lg:hidden">{footerContent.contactLabel}</p>
        {footerContent.links.map((link, index) => (
          <a
            className={`${footerLinkClass} ${
              index === 0 ? "mt-3 max-lg:mt-0" : "mt-2 max-lg:mt-1"
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
