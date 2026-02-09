'use client';

import { forwardRef, useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import Image from 'next/image';

interface SubCategoryItem {
  id: string;
  label: string;
  icon: string;
  description: string;
}

interface SubCategories {
  [key: string]: SubCategoryItem[];
}

interface XMBMainCategoryProps {
  icon: string;
  label: string;
  categoryId: string;
  isSelected: boolean;
  selectedSubItem: string | null;
  subCategories: SubCategories;
  color: {
    selected: string;
    hover: string;
  };
  onClick: () => void;
  onSubItemClick: (subItemId: string) => void;
}

const XMBMainCategory = forwardRef<HTMLDivElement, XMBMainCategoryProps>(
  ({ icon, label, categoryId, isSelected, selectedSubItem, subCategories, color, onClick, onSubItemClick }, ref) => {
    const categorySubItems = useMemo(() => 
      subCategories[categoryId as keyof typeof subCategories] || [], 
      [categoryId, subCategories]
    );
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
      // Container-based scrolling - proper positioning without overlap
      if (isSelected && selectedSubItem) {
        const selectedIndex = categorySubItems.findIndex((item: SubCategoryItem) => item.id === selectedSubItem);
        
        if (selectedIndex !== -1) {
          // Animate all items to their new positions
          categorySubItems.forEach((subItem: SubCategoryItem, index: number) => {
            const element = subItemRefs.current[index];
            if (element) {
              const targetY = (index - selectedIndex) * 20; // Calculate position relative to selected
              
              gsap.to(element, {
                scale: 1.2, // All items same size
                opacity: 0.7, // All items same opacity
                y: targetY,
                duration: 0.4,
                ease: "power2.inOut"
              });
            }
          });
        }
      } else if (!isSelected) {
        // Reset all items when deselected
        categorySubItems.forEach((subItem: SubCategoryItem, index: number) => {
          const element = subItemRefs.current[index];
          if (element) {
            gsap.to(element, {
              scale: 1,
              opacity: 1,
              y: 0,
              duration: 0.3,
              ease: "power2.in"
            });
          }
        });
      }
    }, [selectedSubItem, categorySubItems, isSelected]);

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
            <div className="relative w-16 h-16">
              <Image
                src={icon}
                alt={label}
                fill
                className={`object-contain transition-all duration-300 ${
                  isSelected ? 'scale-110' : 'scale-100'
                }`}
              />
            </div>
            <span className="text-sm mt-2">{label}</span>
          </div>
        </div>

        {/* Scrolled Items - positioned absolutely above main icon */}
        {isSelected && selectedSubItem && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4">
            <div className="flex flex-col space-y-2">
              {categorySubItems.map((subItem: SubCategoryItem, index: number) => {
                const selectedIndex = categorySubItems.findIndex((item: SubCategoryItem) => item.id === selectedSubItem);
                if (index < selectedIndex) {
                  return (
                    <div
                      key={`scrolled-${subItem.id}`}
                      ref={(el) => {
                        subItemRefs.current[index] = el;
                      }}
                      className="relative cursor-pointer scale-100 text-foreground opacity-60"
                    >
                      <div className="flex flex-col items-center">
                        <div className="relative w-12 h-12">
                          <Image
                            src={subItem.icon}
                            alt={subItem.label}
                            fill
                            className="object-contain transition-all duration-300 scale-100"
                          />
                        </div>
                        <span className="text-xs mt-1">{subItem.label}</span>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        )}

        {/* Sub-Content - positioned absolutely below main icon */}
        {isSelected && (
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4">
            <div className="flex flex-col space-y-4">
              {categorySubItems.map((subItem: SubCategoryItem, index: number) => {
                const selectedIndex = categorySubItems.findIndex((item: SubCategoryItem) => item.id === selectedSubItem);
                if (index >= selectedIndex) {
                  return (
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
                        <div className="relative w-16 h-16">
                          <Image
                            src={subItem.icon}
                            alt={subItem.label}
                            fill
                            className="object-contain transition-all duration-300 scale-100"
                          />
                        </div>
                        <span className="text-sm mt-2">{subItem.label}</span>
                      </div>
                      {selectedSubItem === subItem.id && (
                        <div className={`absolute -bottom-2 left-0 right-0 h-0.5 ${color.selected.replace('text-', 'bg-')} rounded-full`} />
                      )}
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
);

XMBMainCategory.displayName = 'XMBMainCategory';

export default XMBMainCategory;
