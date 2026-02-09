"use client";

import Image from "next/image";

interface SubCategoryItem {
  id: string;
  label: string;
  icon: string;
  description: string;
}

interface SubCategories {
  [key: string]: SubCategoryItem[];
}

interface XMBSubCategoryBarProps {
  selectedIcon: string;
  selectedSubItem: string | null;
  subCategories: SubCategories;
  onSubItemClick: (subItemId: string) => void;
}

export default function XMBSubCategoryBar({
  selectedIcon,
  selectedSubItem,
  subCategories,
  onSubItemClick,
}: XMBSubCategoryBarProps) {
  const subItems =
    subCategories[selectedIcon as keyof typeof subCategories] ?? [];

  if (subItems.length === 0) return null;

  const colorMap: Record<string, { selected: string; hover: string }> = {
    home: { selected: "text-blue-500", hover: "text-blue-500/70" },
    projects: { selected: "text-pink-500", hover: "text-pink-500/70" },
    contact: { selected: "text-purple-600", hover: "text-purple-600/70" },
  };
  const color = colorMap[selectedIcon] ?? {
    selected: "text-foreground",
    hover: "text-foreground/70",
  };

  return (
    <div className="flex flex-col gap-2 shrink-0 py-2 pl-2 pr-1 border-r border-border/50">
      {subItems.map((subItem) => (
        <button
          key={subItem.id}
          onClick={() => onSubItemClick(subItem.id)}
          className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
            selectedSubItem === subItem.id
              ? color.selected + " bg-foreground/10"
              : "text-foreground/70 hover:" + color.hover
          }`}
        >
          <div className="relative w-10 h-10">
            <Image
              src={subItem.icon}
              alt={subItem.label}
              fill
              className="object-contain"
            />
          </div>
          <span className="text-xs mt-1 text-center line-clamp-2">
            {subItem.label}
          </span>
        </button>
      ))}
    </div>
  );
}
