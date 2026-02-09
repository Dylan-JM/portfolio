"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import XMBSubCategoryBar from "./XMBSubCategoryBar";
import XMBSubCategoryContent from "./XMBSubCategoryContent";
import XMBSystemInfo from "./XMBSystemInfo";
import XMBMainNavigation from "./XMBMainNavigation";
import { subCategories } from "@/app/_data/categories";

gsap.registerPlugin(ScrollTrigger);

const FOCUSABLE_INPUTS = ["INPUT", "TEXTAREA", "SELECT"];
const icons = ["home", "projects", "contact"] as const;

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

  const selectedIconRef = useRef(selectedIcon);
  const selectedSubItemRef = useRef(selectedSubItem);
  selectedIconRef.current = selectedIcon;
  selectedSubItemRef.current = selectedSubItem;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        FOCUSABLE_INPUTS.includes(target.tagName) ||
        target.isContentEditable
      ) {
        return;
      }

      const currentSelectedIcon = selectedIconRef.current;
      const currentSelectedSubItem = selectedSubItemRef.current;
      const currentIndex = icons.indexOf(
        currentSelectedIcon as (typeof icons)[number],
      );

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
            currentSelectedIcon &&
            subCategories[currentSelectedIcon as keyof typeof subCategories]
          ) {
            const subItems =
              subCategories[currentSelectedIcon as keyof typeof subCategories];
            const currentSubIndex = currentSelectedSubItem
              ? subItems.findIndex((item) => item.id === currentSelectedSubItem)
              : -1;
            if (currentSubIndex < subItems.length - 1) {
              handleSubItemClick(subItems[currentSubIndex + 1].id);
            }
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          if (
            currentSelectedIcon &&
            subCategories[currentSelectedIcon as keyof typeof subCategories]
          ) {
            const subItems =
              subCategories[currentSelectedIcon as keyof typeof subCategories];
            const currentSubIndex = currentSelectedSubItem
              ? subItems.findIndex((item) => item.id === currentSelectedSubItem)
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

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  return (
    <>
      {/* Hidden Audio Element */}
      <audio ref={audioRef} src="/audio/nav.mp3" preload="auto" />

      <XMBSystemInfo />

      <div
        ref={containerRef}
        className="fixed top-0 left-0 right-0 bottom-0 md:bottom-auto z-50 md:right-auto flex flex-col md:flex-row md:items-start md:gap-1 pt-16 md:pt-[14%] pl-0 md:pl-[5%] pr-0 outline-none focus:outline-none"
        tabIndex={-1}
      >
        {/* Mobile: scrollable main bar below system info */}
        <div className="md:hidden overflow-x-auto overflow-y-hidden scrollbar-overlay shrink-0 min-w-0 border-b border-border/50 bg-background/80 backdrop-blur-sm">
          <div className="flex gap-6 pl-2 pr-4 py-3 w-fit min-w-full justify-start">
            <XMBMainNavigation
              selectedIcon={selectedIcon}
              selectedSubItem={selectedSubItem}
              subCategories={subCategories}
              onIconClick={handleIconClick}
              onSubItemClick={handleSubItemClick}
            />
          </div>
        </div>
        {/* Desktop: main nav + content */}
        <div className="hidden md:flex flex-row items-start gap-1">
          <XMBMainNavigation
            selectedIcon={selectedIcon}
            selectedSubItem={selectedSubItem}
            subCategories={subCategories}
            onIconClick={handleIconClick}
            onSubItemClick={handleSubItemClick}
          />
          <XMBSubCategoryContent
            selectedIcon={selectedIcon}
            selectedSubItem={selectedSubItem}
          />
        </div>
        {/* Mobile: sub-bar (left) + content (right) */}
        <div className="md:hidden flex flex-row flex-1 min-h-0 pt-2 overflow-hidden">
          <XMBSubCategoryBar
            selectedIcon={selectedIcon}
            selectedSubItem={selectedSubItem}
            subCategories={subCategories}
            onSubItemClick={handleSubItemClick}
          />
          <div className="flex-1 min-w-0 overflow-hidden">
            <XMBSubCategoryContent
              selectedIcon={selectedIcon}
              selectedSubItem={selectedSubItem}
            />
          </div>
        </div>
      </div>
    </>
  );
}
