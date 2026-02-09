"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import XMBSubCategoryContent from "./XMBSubCategoryContent";
import XMBSystemInfo from "./XMBSystemInfo";
import XMBMainNavigation from "./XMBMainNavigation";
import { subCategories } from "@/app/_data/categories";

gsap.registerPlugin(ScrollTrigger);

export default function XMBNavigation() {
  const [selectedIcon, setSelectedIcon] = useState("projects");
  const [selectedSubItem, setSelectedSubItem] = useState<string | null>(
    "startup",
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Play navigation sound
  const playNavSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reset to start
      audioRef.current.play().catch((error) => {
        console.log("Audio play failed:", error);
      });
    }
  };

  const handleIconClick = (iconId: string) => {
    playNavSound();
    setSelectedIcon(iconId);

    // Auto-select first sub-category for each main category
    if (iconId === "home") {
      setSelectedSubItem("about"); // First sub-category
    } else if (iconId === "projects") {
      setSelectedSubItem("startup"); // First sub-category
    } else if (iconId === "contact") {
      setSelectedSubItem("email"); // First sub-category
    }
  };

  const handleSubItemClick = (subItemId: string) => {
    playNavSound();
    setSelectedSubItem(subItemId);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const icons = ["home", "projects", "contact"];
    const currentIndex = icons.indexOf(selectedIcon);

    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        if (currentIndex > 0) {
          handleIconClick(icons[currentIndex - 1]);
        }
        break;
      case "ArrowRight":
        e.preventDefault();
        if (currentIndex < icons.length - 1) {
          handleIconClick(icons[currentIndex + 1]);
        }
        break;
      case "ArrowDown":
        e.preventDefault();
        if (
          selectedIcon &&
          subCategories[selectedIcon as keyof typeof subCategories]
        ) {
          const subItems =
            subCategories[selectedIcon as keyof typeof subCategories];
          const currentSubIndex = selectedSubItem
            ? subItems.findIndex((item) => item.id === selectedSubItem)
            : -1;
          if (currentSubIndex < subItems.length - 1) {
            handleSubItemClick(subItems[currentSubIndex + 1].id);
          }
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        if (
          selectedIcon &&
          subCategories[selectedIcon as keyof typeof subCategories]
        ) {
          const subItems =
            subCategories[selectedIcon as keyof typeof subCategories];
          const currentSubIndex = selectedSubItem
            ? subItems.findIndex((item) => item.id === selectedSubItem)
            : subItems.length;

          if (currentSubIndex > 0) {
            handleSubItemClick(subItems[currentSubIndex - 1].id);
          } else {
            setSelectedSubItem(null);
          }
        }
        break;
    }
  };
  return (
    <>
      {/* Hidden Audio Element */}
      <audio ref={audioRef} src="/audio/nav.mp3" preload="auto" />

      <XMBSystemInfo />

      <div
        ref={containerRef}
        className="fixed top-0 left-0 right-0 z-50 h-64"
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <XMBMainNavigation
          selectedIcon={selectedIcon}
          selectedSubItem={selectedSubItem}
          subCategories={subCategories}
          onIconClick={handleIconClick}
          onSubItemClick={handleSubItemClick}
        />
      </div>

      {/* Content Display - Only Sub-Content */}
      <XMBSubCategoryContent
        selectedIcon={selectedIcon}
        selectedSubItem={selectedSubItem}
        contentOffset={
          selectedIcon === "home"
            ? "left-[10%]"
            : selectedIcon === "projects"
              ? "left-[20%]"
              : selectedIcon === "contact"
                ? "left-[28%]"
                : "left-[15%]"
        }
      />
    </>
  );
}
