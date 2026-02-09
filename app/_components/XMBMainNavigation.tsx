'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import XMBMainCategory from './XMBMainCategory';
import { mainCategoryIcons } from '@/app/_data/categories';

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
  onSubItemClick 
}: XMBMainNavigationProps) {
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Animate icons on mount
    gsap.fromTo(iconRefs.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" }
    );
  }, []);

  return (
    <>
      {/* Main Navigation - XMB Style */}
      <div className="grid grid-cols-3 gap-20 justify-start items-center" style={{ marginTop: '14%', width: 'fit-content', margin: '14% 0 0 5%' }}>
        {/* Home Icon */}
        <XMBMainCategory
          ref={(el) => {
            iconRefs.current[0] = el;
          }}
          icon={mainCategoryIcons.home}
          label="Home"
          categoryId="home"
          isSelected={selectedIcon === 'home'}
          selectedSubItem={selectedSubItem}
          subCategories={subCategories}
          color={{
            selected: 'text-blue-500',
            hover: 'text-blue-500/70'
          }}
          onClick={() => onIconClick('home')}
          onSubItemClick={onSubItemClick}
        />

        {/* Projects Icon */}
        <XMBMainCategory
          ref={(el) => {
            iconRefs.current[2] = el;
          }}
          icon={mainCategoryIcons.projects}
          label="Projects"
          categoryId="projects"
          isSelected={selectedIcon === 'projects'}
          selectedSubItem={selectedSubItem}
          subCategories={subCategories}
          color={{
            selected: 'text-pink-500',
            hover: 'text-pink-500/70'
          }}
          onClick={() => onIconClick('projects')}
          onSubItemClick={onSubItemClick}
        />

        {/* Contact Icon */}
        <XMBMainCategory
          ref={(el) => {
            iconRefs.current[1] = el;
          }}
          icon={mainCategoryIcons.contact}
          label="Contact"
          categoryId="contact"
          isSelected={selectedIcon === 'contact'}
          selectedSubItem={selectedSubItem}
          subCategories={subCategories}
          color={{
            selected: 'text-purple-600',
            hover: 'text-purple-600/70'
          }}
          onClick={() => onIconClick('contact')}
          onSubItemClick={onSubItemClick}
        />

        
      </div>
    </>
  );
}
