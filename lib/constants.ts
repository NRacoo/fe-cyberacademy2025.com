import { THEME } from "./theme";

export interface NavigationItem {
  label: string;
  ariaLabel: string;
  link: string;
  isButton?: boolean;
}

export const HEADER_CONFIG = {
  position: "right" as const,
  logoUrl: "/images/logo.svg",
  menuButtonColor: THEME.colors.white,
  openMenuButtonColor: THEME.colors.black,
  accentColor: THEME.colors.primaryHover,
  colors: [THEME.colors.primary, THEME.colors.secondary, THEME.colors.black],
};

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { label: "Home", ariaLabel: "Go to Home", link: "#home" },
  { label: "About", ariaLabel: "Go to About", link: "#about" },
  { label: "Benefit", ariaLabel: "Go to Benefit", link: "#benefits" },
  { label: "Course", ariaLabel: "Go to Course", link: "#courses" },
  { label: "Medpart", ariaLabel: "Go to Medpart", link: "#medpart" },
  { label: "Login", ariaLabel: "Go to Login", link: "/login", isButton: true },
];

export const SOCIAL_ITEMS = [
  { label: "Instagram", link: "https://instagram.com" },
  { label: "LinkedIn", link: "https://linkedin.com" },
];

export const PARTNERS = [
  {
    id: "adaptive",
    src: "/images/partners/adaptive.svg",
    alt: "Adaptive Partner",
  },
  { id: "antena", src: "/images/partners/antena.svg", alt: "Antena Partner" },
  { id: "aptrg", src: "/images/partners/aptrg.svg", alt: "APTRG Partner" },
  { id: "cci", src: "/images/partners/cci.svg", alt: "CCI Partner" },
  { id: "daskom", src: "/images/partners/daskom.svg", alt: "Daskom Partner" },
  {
    id: "dastran",
    src: "/images/partners/dastran.svg",
    alt: "Dastran Partner",
  },
  {
    id: "digistar",
    src: "/images/partners/digistar.svg",
    alt: "Digistar Partner",
  },
  { id: "dsp", src: "/images/partners/dsp.svg", alt: "DSP Partner" },
  { id: "eirrg", src: "/images/partners/eirrg.svg", alt: "EIRRG Partner" },
  { id: "elka", src: "/images/partners/elka.svg", alt: "Elka Partner" },
  { id: "elkom", src: "/images/partners/elkom.svg", alt: "Elkom Partner" },
  { id: "esc", src: "/images/partners/esc.svg", alt: "ESC Partner" },
  { id: "himads", src: "/images/partners/himads.svg", alt: "HIMADS Partner" },
  { id: "hmtt", src: "/images/partners/hmtt.svg", alt: "HMTT Partner" },
  { id: "ieee", src: "/images/partners/ieee.svg", alt: "IEEE Partner" },
  { id: "iss", src: "/images/partners/iss.svg", alt: "ISS Partner" },
  { id: "mbc", src: "/images/partners/mbc.svg", alt: "MBC Partner" },
  { id: "mobcom", src: "/images/partners/mobcom.svg", alt: "Mobcom Partner" },
  {
    id: "opticom",
    src: "/images/partners/opticom.svg",
    alt: "Opticom Partner",
  },
  { id: "p", src: "/images/partners/p.svg", alt: "P Partner" },
  {
    id: "prodigi",
    src: "/images/partners/prodigi.svg",
    alt: "Prodigi Partner",
  },
  { id: "rl", src: "/images/partners/rl.svg", alt: "RL Partner" },
  { id: "sas", src: "/images/partners/sas.svg", alt: "SAS Partner" },
  {
    id: "sisgrid",
    src: "/images/partners/sisgrid.svg",
    alt: "Sisgrid Partner",
  },
  { id: "siskom", src: "/images/partners/siskom.svg", alt: "Siskom Partner" },
  { id: "sv", src: "/images/partners/sv.svg", alt: "SV Partner" },
  { id: "upci", src: "/images/partners/upci.svg", alt: "UPCI Partner" },
];
