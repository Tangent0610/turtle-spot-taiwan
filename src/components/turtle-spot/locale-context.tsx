"use client";

import { createContext, useContext, type ReactNode } from "react";
import {
  dictionaries,
  type Dictionary,
  type Locale,
} from "@/i18n/dictionaries";

const LocaleContext = createContext<Dictionary | null>(null);

export const LocaleProvider = ({
  children,
  locale,
}: {
  children: ReactNode;
  locale: Locale;
}) => (
  <LocaleContext.Provider value={dictionaries[locale]}>
    {children}
  </LocaleContext.Provider>
);

export const useDictionary = () => {
  const dictionary = useContext(LocaleContext);

  if (!dictionary) {
    throw new Error("useDictionary must be used within LocaleProvider");
  }

  return dictionary;
};
