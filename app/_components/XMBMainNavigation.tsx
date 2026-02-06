'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface XMBMainNavigationProps {
  selectedIcon: string;
  selectedSubItem: string | null;
  subCategories: any;
  onIconClick: (iconId: string) => void;
  onSubItemClick: (subItemId: string) => void;
}

export default function XMBMainNavigation({ 
  selectedIcon, 
  selectedSubItem, 
  subCategories, 
  onIconClick, 
  onSubItemClick 
}: XMBMainNavigationProps) {
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Animate icons on mount
    gsap.fromTo(iconRefs.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" }
    );

    // Animate sub-items when main icon is selected
    if (selectedIcon && subCategories[selectedIcon as keyof typeof subCategories]) {
      gsap.fromTo(iconRefs.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: "power2.out" }
      );
    }
  }, [selectedIcon, subCategories]);

  return (
    <>
      {/* Main Navigation - XMB Style */}
      <div className="grid grid-cols-3 gap-20 justify-center items-center" style={{ marginTop: '14%', width: 'fit-content', margin: '14% auto 0' }}>
        {/* Home Icon */}
        <div
          ref={(el) => {
            iconRefs.current[0] = el;
          }}
          className={`relative cursor-pointer transition-all duration-300 ${
            selectedIcon === 'home' 
              ? 'scale-125 text-blue-500' 
              : 'scale-100 text-foreground hover:text-blue-500/70'
          }`}
          onClick={() => onIconClick('home')}
        >
          <div className="flex flex-col items-center">
            <span className="text-6xl">🏠</span>
            <span className="text-sm mt-2">Home</span>
          </div>
        </div>

        {/* About Icon */}
        <div
          ref={(el) => {
            iconRefs.current[1] = el;
          }}
          className={`relative cursor-pointer transition-all duration-300 ${
            selectedIcon === 'about' 
              ? 'scale-125 text-purple-600' 
              : 'scale-100 text-foreground hover:text-purple-600/70'
          }`}
          onClick={() => onIconClick('about')}
        >
          <div className="flex flex-col items-center">
            <span className="text-6xl">👤</span>
            <span className="text-sm mt-2">About</span>
          </div>
        </div>

        {/* Projects Icon */}
        <div
          ref={(el) => {
            iconRefs.current[2] = el;
          }}
          className={`relative cursor-pointer transition-all duration-300 ${
            selectedIcon === 'projects' 
              ? 'scale-125 text-pink-500' 
              : 'scale-100 text-foreground hover:text-pink-500/70'
          }`}
          onClick={() => onIconClick('projects')}
        >
          <div className="flex flex-col items-center">
            <span className="text-6xl">💼</span>
            <span className="text-sm mt-2">Projects</span>
          </div>
        </div>
      </div>

      {/* Sub-Navigation - Below Related Icon */}
      {selectedIcon && (
        <div className="grid grid-cols-3 gap-20 justify-center items-start" style={{ width: 'fit-content', margin: '2rem auto 0' }}>
          {/* Home Column */}
          <div className="flex flex-col space-y-4">
            {selectedIcon === 'home' && subCategories.home.map((subItem, index) => (
              <div
                key={subItem.id}
                ref={(el) => {
                  iconRefs.current[index] = el;
                }}
                className={`relative cursor-pointer transition-all duration-300 ${
                  selectedSubItem === subItem.id
                    ? 'scale-110 text-blue-500'
                    : 'scale-100 text-foreground hover:text-blue-500/70'
                }`}
                onClick={() => onSubItemClick(subItem.id)}
              >
                <div className="flex flex-col items-center">
                  <span className="text-3xl">{subItem.icon}</span>
                  <span className="text-xs mt-1">{subItem.label}</span>
                </div>
                {selectedSubItem === subItem.id && (
                  <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />
                )}
              </div>
            ))}
          </div>
        
          {/* About Column */}
          <div className="flex flex-col space-y-4">
            {selectedIcon === 'about' && subCategories.about.map((subItem, index) => (
              <div
                key={subItem.id}
                ref={(el) => {
                  iconRefs.current[index] = el;
                }}
                className={`relative cursor-pointer transition-all duration-300 ${
                  selectedSubItem === subItem.id
                    ? 'scale-110 text-purple-600'
                    : 'scale-100 text-foreground hover:text-purple-600/70'
                }`}
                onClick={() => onSubItemClick(subItem.id)}
              >
                <div className="flex flex-col items-center">
                  <span className="text-3xl">{subItem.icon}</span>
                  <span className="text-xs mt-1">{subItem.label}</span>
                </div>
                {selectedSubItem === subItem.id && (
                  <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-purple-600 rounded-full" />
                )}
              </div>
            ))}
          </div>
        
          {/* Projects Column */}
          <div className="flex flex-col space-y-4">
            {selectedIcon === 'projects' && subCategories.projects.map((subItem, index) => (
              <div
                key={subItem.id}
                ref={(el) => {
                  iconRefs.current[index] = el;
                }}
                className={`relative cursor-pointer transition-all duration-300 ${
                  selectedSubItem === subItem.id
                    ? 'scale-110 text-pink-500'
                    : 'scale-100 text-foreground hover:text-pink-500/70'
                }`}
                onClick={() => onSubItemClick(subItem.id)}
              >
                <div className="flex flex-col items-center">
                  <span className="text-3xl">{subItem.icon}</span>
                  <span className="text-xs mt-1">{subItem.label}</span>
                </div>
                {selectedSubItem === subItem.id && (
                  <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-pink-500 rounded-full" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
