'use client';

import { forwardRef } from 'react';

interface XMBMainCategoryProps {
  icon: string;
  label: string;
  isSelected: boolean;
  color: {
    selected: string;
    hover: string;
  };
  onClick: () => void;
}

const XMBMainCategory = forwardRef<HTMLDivElement, XMBMainCategoryProps>(
  ({ icon, label, isSelected, color, onClick }, ref) => {
    return (
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
    );
  }
);

XMBMainCategory.displayName = 'XMBMainCategory';

export default XMBMainCategory;
