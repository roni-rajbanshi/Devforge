"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="popLayout">
      <motion.main
        key={pathname}
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0.3, x: -60 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: "100%",
          minHeight: "100vh",
          willChange: "transform, opacity",
        }}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
