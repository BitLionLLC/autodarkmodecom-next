import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { OPEN_GRAPH_DEFAULTS, SITE_NAME } from "@/lib/metadata";
import { GA_MEASUREMENT_ID, SITE_URL } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const title = "Auto Dark Mode — dark mode for every site, automatically";
const description =
  "A Chrome extension that turns light websites dark the moment they load. It skips sites that are already dark, keeps photos and video looking right, and stays out of your way.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: `%s — ${SITE_NAME}`,
  },
  description,
  keywords: [
    "dark mode",
    "chrome extension",
    "dark theme",
    "night mode",
    "browser dark mode",
  ],
  alternates: { canonical: "/" },
  applicationName: SITE_NAME,
  // Facebook and LinkedIn both read the Open Graph block; the card image itself
  // comes from app/opengraph-image.tsx, which Next turns into og:image plus the
  // type/width/height tags LinkedIn wants before it will render a large card.
  openGraph: {
    ...OPEN_GRAPH_DEFAULTS,
    title,
    description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    apple: "/icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0c",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
        </Script>
      </body>
    </html>
  );
}
