'use client';

import { forwardRef, useEffect, useRef } from 'react';
import gsap from 'gsap';

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
    const subItemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const mainCategoryRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      // Animate main category when selection changes
      const element = mainCategoryRef.current;
      if (element) {
        console.log('Animating main category:', isSelected, element);
        if (isSelected) {
          gsap.fromTo(element, {
            scale: 1,
          }, {
            scale: 1.3,
            duration: 0.4,
            ease: "back.out(1.7)"
          });
        } else {
          gsap.to(element, {
            scale: 1,
            duration: 0.3,
            ease: "power2.in"
          });
        }
      }
    }, [isSelected]);

    useEffect(() => {
      // Animate sub-items when selection changes
      categorySubItems.forEach((subItem: any, index: number) => {
        const element = subItemRefs.current[index];
        if (element) {
          if (selectedSubItem === subItem.id) {
            gsap.fromTo(element, {
              scale: 1,
            }, {
              scale: 1.2,
              duration: 0.3,
              ease: "back.out(1.7)"
            });
          } else {
            gsap.to(element, {
              scale: 1,
              duration: 0.2,
              ease: "power2.in"
            });
          }
        }
      });
    }, [selectedSubItem, categorySubItems]);

    useEffect(() => {
      // Animate sub-items when they appear
      if (isSelected && categorySubItems.length > 0) {
        gsap.fromTo(subItemRefs.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.3, stagger: 0.1, ease: "power2.out" }
        );
      }
    }, [isSelected, categorySubItems.length]);

    return (
      <div className="relative">
        {/* Main Category */}
        <div
          ref={mainCategoryRef}
          className={`relative cursor-pointer ${
            isSelected 
              ? color.selected 
              : 'text-foreground hover:' + color.hover
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
              {categorySubItems.map((subItem: any, index: number) => (
                <div
                  key={subItem.id}
                  ref={(el) => {
                    subItemRefs.current[index] = el;
                  }}
                  className={`relative cursor-pointer ${
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
