import "./globals.css";
import Navbar from "./components/Navbar";
import PageTransition from "./components/PageTransition";
import CustomCursor from "./components/CustomCursor";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata = {
  title: "DevForge | Elite Developer Collective",
  description: "A next-generation portfolio showcasing three elite developers — Minecraft, Discord, and Web — united by code, driven by innovation.",
  keywords: "developer portfolio, minecraft developer, discord developer, web developer, fullstack, 3D portfolio",
  openGraph: {
    title: "DevForge | Elite Developer Collective",
    description: "A next-generation portfolio showcasing three elite developers.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&family=Orbitron:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <Navbar />
        <PageTransition>{children}</PageTransition>
        <CustomCursor />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
