"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SecretHistoryModal } from "./SecretHistoryModal";

interface TwsLogoProps {
  className?: string;
  imageClassName?: string;
  auditCategory?: "business" | "fitness" | "nutrition" | "physio" | "all";
  showLink?: boolean;
}

export function TwsLogo({
  className = "",
  imageClassName = "h-8 sm:h-9 w-auto",
  auditCategory = "all",
  showLink = true,
}: TwsLogoProps) {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [lastClickTime, setLastClickTime] = useState(0);

  // Handle double click or fast double-tap for touch devices
  const handleTriggerSecret = (e: React.MouseEvent) => {
    // Check for double click
    setIsHistoryOpen(true);
  };

  const handleTouchEnd = () => {
    const now = Date.now();
    if (now - lastClickTime < 350) {
      setIsHistoryOpen(true);
    }
    setLastClickTime(now);
  };

  const logoElement = (
    <div
      onDoubleClick={handleTriggerSecret}
      onTouchEnd={handleTouchEnd}
      title="TWS Diagnostic Suite (Double-click for Auditor History)"
      className={`relative inline-flex items-center cursor-pointer select-none transition-transform active:scale-95 group ${className}`}
    >
      <Image
        src="/tws-logo.png"
        alt="TWS - The Winning Strategy"
        width={140}
        height={52}
        priority
        className={`object-contain transition-opacity duration-200 group-hover:opacity-90 ${imageClassName}`}
      />
    </div>
  );

  return (
    <>
      {showLink ? (
        <div className="inline-flex items-center">
          {logoElement}
        </div>
      ) : (
        logoElement
      )}

      {/* Secret History Modal */}
      <SecretHistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        activeCategory={auditCategory}
      />
    </>
  );
}
