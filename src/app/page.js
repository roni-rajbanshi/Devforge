"use client";
import dynamic from "next/dynamic";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Footer from "./components/Footer";

import CyberNav from "./components/CyberNav";


const VerticalSpacer = () => (
  <div className="w-full flex justify-center -my-8 relative z-10 pointer-events-none">
    <div className="w-[1px] h-24 sm:h-32 bg-gradient-to-b from-transparent via-[#a855f7]/40 to-transparent relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rotate-45 bg-[#a855f7]/80 shadow-[0_0_10px_#a855f7]" />
    </div>
  </div>
);

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Navbar />
      <main className="flex flex-col bg-[#030307]">
        <HeroSection />
        <VerticalSpacer />
        <CyberNav />
        <VerticalSpacer />
      </main>
      <Footer />
    </>
  );
}
