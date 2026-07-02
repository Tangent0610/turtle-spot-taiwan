export const locales = ["zh", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "zh";

export const getNextLocale = (current: Locale) =>
  locales[(locales.indexOf(current) + 1) % locales.length] ?? defaultLocale;

export const dictionaries = {
  zh: {
    code: "zh-Hant",
    localeButton: "EN",
    sound: "Sound",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    menuContact: "聯絡我們 —",
    menuFollow: "追蹤我們 —",
    navLabels: ["海龜地圖", "文章分享", "關於我們", "教育資源", "目擊回報"],
    factLabels: [
      "名字",
      "品種",
      "體型",
      "背甲花紋",
      "右臉鱗片",
      "左臉鱗片",
      "命名者",
      "回報者",
      "外型特徵",
    ],
    leftFace: "左臉：",
    rightFace: "右臉：",
    favoriteDive: "最愛潛點",
    witness: "目擊動態",
  },
  en: {
    code: "en",
    localeButton: "TW",
    sound: "Sound",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    menuContact: "Contact us —",
    menuFollow: "Follow us —",
    navLabels: [
      "Turtle Map",
      "Articles",
      "About Us",
      "Education Resources",
      "Report Sightings",
    ],
    factLabels: [
      "Name",
      "Species",
      "Age",
      "Shell pattern",
      "Right facial scales",
      "Left facial scales",
      "Named by",
      "Reported by",
      "Features",
    ],
    leftFace: "Left face:",
    rightFace: "Right face:",
    favoriteDive: "Favorite dive site",
    witness: "Witness story",
  },
} as const satisfies Record<Locale, Record<string, unknown>>;

export type Dictionary = (typeof dictionaries)[Locale];
