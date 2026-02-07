'use client';

import { forwardRef } from 'react';

interface XMBMainCategoryProps {
  icon: string;
  label: string;
  categoryId: string;
  isSelected: boolean;
  selectedSubItem: string | null;
  subCategories: any;
  color: {
    selected: string;
    hover: string;
  };
  onClick: () => void;
  onSubItemClick: (subItemId: string) => void;
}

const XMBMainCategory = forwardRef<HTMLDivElement, XMBMainCategoryProps>(
  ({ icon, label, categoryId, isSelected, selectedSubItem, subCategories, color, onClick, onSubItemClick }, ref) => {
    const categorySubItems = subCategories[categoryId as keyof typeof subCategories] || [];

    return (
      <div className="relative">
        {/* Main Category */}
        <div
          ref={ref}
          className={`relative cursor-pointer transition-all duration-300 ${
            isSelected 
              ? 'scale-125 ' + color.selected 
              : 'scale-100 text-foreground hover:' + color.hover
          }`}
          onClick={onClick}
        >
          <div className="flex flex-col items-center">
            <span className="text-6xl">{icon}</span>
            <span className="text-sm mt-2">{label}</span>
          </div>
        </div>

        {/* Sub-Content - positioned absolutely below main icon */}
        {isSelected && (
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4">
            <div className="flex flex-col space-y-4">
              {categorySubItems.map((subItem: any) => (
                <div
                  key={subItem.id}
                  className={`relative cursor-pointer transition-all duration-300 ${
                    selectedSubItem === subItem.id
                      ? 'scale-110 ' + color.selected
                      : 'scale-100 text-foreground hover:' + color.hover
                  }`}
                  onClick={() => onSubItemClick(subItem.id)}
                >
                  <div className="flex flex-col items-center">
                    <span className="text-3xl">{subItem.icon}</span>
                    <span className="text-xs mt-1">{subItem.label}</span>
                  </div>
                  {selectedSubItem === subItem.id && (
                    <div className={`absolute -bottom-2 left-0 right-0 h-0.5 ${color.selected.replace('text-', 'bg-')} rounded-full`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
);

XMBMainCategory.displayName = 'XMBMainCategory';

export default XMBMainCategory;
