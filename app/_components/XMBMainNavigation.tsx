"use client";

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import XMBMainCategory from "./XMBMainCategory";
import { mainCategoryIcons } from "@/app/_data/categories";

const iconOrder = ["home", "projects", "contact"] as const;

interface SubCategories {
  [key: string]: {
    id: string;
    label: string;
    icon: string;
    description: string;
  }[];
}

interface XMBMainNavigationProps {
  selectedIcon: string;
  selectedSubItem: string | null;
  subCategories: SubCategories;
  onIconClick: (iconId: string) => void;
  onSubItemClick: (subItemId: string) => void;
}

export default function XMBMainNavigation({
  selectedIcon,
  selectedSubItem,
  subCategories,
  onIconClick,
  onSubItemClick,
}: XMBMainNavigationProps) {
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rowRef = useRef<HTMLDivElement | null>(null);
  const spacingRef = useRef<number>(0);
  const anchorIndexRef = useRef<number>(0);
  const didInitRef = useRef(false);

  useEffect(() => {
    // Animate icons on mount
    gsap.fromTo(
      iconRefs.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" },
    );
  }, []);

  const ensureSpacing = useCallback((attempt = 0) => {
    if (spacingRef.current > 0) return true;

    const first = iconRefs.current[0];
    const second = iconRefs.current[1];
    if (first && second) {
      const firstRect = first.getBoundingClientRect();
      const secondRect = second.getBoundingClientRect();
      spacingRef.current = Math.abs(secondRect.left - firstRect.left);
    }

    if (spacingRef.current === 0 && attempt < 5) {
      requestAnimationFrame(() => ensureSpacing(attempt + 1));
    }

    return spacingRef.current > 0;
  }, []);

  const updateRowPosition = useCallback(() => {
    const selectedIndex = iconOrder.indexOf(
      selectedIcon as (typeof iconOrder)[number],
    );
    const spacingReady = ensureSpacing();
    const spacing = spacingRef.current;

    if (!rowRef.current || !spacingReady || spacing === 0) return;

    const deltaX = (anchorIndexRef.current - selectedIndex) * spacing;
    gsap.to(rowRef.current, {
      x: deltaX,
      duration: 0.4,
      ease: "power2.out",
    });
  }, [selectedIcon]);

  useLayoutEffect(() => {
    if (didInitRef.current) return;
    ensureSpacing();

    anchorIndexRef.current = iconOrder.indexOf(
      selectedIcon as (typeof iconOrder)[number],
    );
    updateRowPosition();
    didInitRef.current = true;
  }, [ensureSpacing, selectedIcon, updateRowPosition]);

  useLayoutEffect(() => {
    updateRowPosition();
  }, [selectedIcon, updateRowPosition]);

  useEffect(() => {
    const handleResize = () => {
      spacingRef.current = 0;
      ensureSpacing();

      updateRowPosition();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [ensureSpacing, updateRowPosition]);

  return (
    <>
      {/* Main Navigation - XMB Style */}
      <div className="relative" style={{ margin: "14% 0 0 5%" }}>
        <div ref={rowRef} className="flex gap-20 items-center w-fit">
          {/* Home Icon */}
          <XMBMainCategory
            ref={(el) => {
              iconRefs.current[0] = el;
            }}
            icon={mainCategoryIcons.home}
            label="Home"
            categoryId="home"
            isSelected={selectedIcon === "home"}
            selectedSubItem={selectedSubItem}
            subCategories={subCategories}
            color={{
              selected: "text-blue-500",
              hover: "text-blue-500/70",
            }}
            onClick={() => onIconClick("home")}
            onSubItemClick={onSubItemClick}
          />

          {/* Projects Icon */}
          <XMBMainCategory
            ref={(el) => {
              iconRefs.current[1] = el;
            }}
            icon={mainCategoryIcons.projects}
            label="Projects"
            categoryId="projects"
            isSelected={selectedIcon === "projects"}
            selectedSubItem={selectedSubItem}
            subCategories={subCategories}
            color={{
              selected: "text-pink-500",
              hover: "text-pink-500/70",
            }}
            onClick={() => onIconClick("projects")}
            onSubItemClick={onSubItemClick}
          />

          {/* Contact Icon */}
          <XMBMainCategory
            ref={(el) => {
              iconRefs.current[2] = el;
            }}
            icon={mainCategoryIcons.contact}
            label="Contact"
            categoryId="contact"
            isSelected={selectedIcon === "contact"}
            selectedSubItem={selectedSubItem}
            subCategories={subCategories}
            color={{
              selected: "text-purple-600",
              hover: "text-purple-600/70",
            }}
            onClick={() => onIconClick("contact")}
            onSubItemClick={onSubItemClick}
          />
        </div>
      </div>
    </>
  );
}
