'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '@/app/_data/projects';
import XMBSubCategoryContent from './XMBSubCategoryContent';
import XMBSystemInfo from './XMBSystemInfo';
import XMBMainNavigation from './XMBMainNavigation';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function XMBNavigation() {
  const [selectedIcon, setSelectedIcon] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [selectedSubItem, setSelectedSubItem] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Play navigation sound
  const playNavSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reset to start
      audioRef.current.play().catch(error => {
        console.log('Audio play failed:', error);
      });
    }
  };

  // Sub-categories for each main icon
  const subCategories = {
    home: [
      { id: 'about', label: 'About', icon: '👤', description: 'Full-stack developer with expertise in modern web technologies' },
      { id: 'skills', label: 'Skills', icon: '⚡', description: 'JavaScript, TypeScript, React, Next.js, Node.js, Python, C++' },
      { id: 'what-i-do', label: 'What I Do', icon: '🎯', description: 'Gameplay programming, backend development, and systems design' },
      { id: 'technical-focus', label: 'Technical Focus', icon: '�', description: 'Unreal Engine 5, multiplayer systems, full stack development' },
      { id: 'background', label: 'Background', icon: '📚', description: 'BSc Computer Games Technology and Software Development Bootcamp' },
      { id: 'how-i-work', label: 'How I Work', icon: '⚙️', description: 'Detail-oriented, focused on robust and scalable systems' },
      { id: 'outside-of-work', label: 'Outside of Work', icon: '🎮', description: 'Experimenting with new tools and learning new technologies' }
    ],
    about: [
      { id: 'background', label: 'Background', icon: '📚', description: 'Self-taught developer passionate about creating innovative solutions' },
      { id: 'education', label: 'Education', icon: '🎓', description: 'Continuous learning through online courses and hands-on projects' },
      { id: 'interests', label: 'Interests', icon: '🎯', description: 'Game development, AI/ML, system architecture, user experience' },
      { id: 'goals', label: 'Goals', icon: '🚀', description: 'Build scalable applications and contribute to open-source projects' }
    ],
    projects: [
      { id: 'startup', label: 'Startups', icon: '🚀', description: 'Innovative startup projects and MVPs' },
      { id: 'web', label: 'Web Projects', icon: '🌐', description: 'Full-stack web applications and APIs' },
      { id: 'games', label: 'Game Projects', icon: '🎮', description: 'Interactive games and game development tools' }
    ]
  };

  // Group projects by category
  const projectCategories = [
    {
      id: 'startup',
      label: 'Startups',
      icon: '🚀',
      projects: projects.filter(p => p.category === 'startup')
    },
    {
      id: 'web',
      label: 'Web Projects',
      icon: '🌐',
      projects: projects.filter(p => p.category === 'web')
    },
    {
      id: 'games',
      label: 'Game Projects',
      icon: '🎮',
      projects: projects.filter(p => p.category === 'game')
    }
  ];

  const handleIconClick = (iconId: string) => {
    playNavSound();
    setSelectedIcon(iconId);
    setSelectedCategory(null);
    setSelectedProject(null);
    
    // Auto-select first sub-category for each main category
    if (iconId === 'home') {
      setSelectedSubItem('about'); // First sub-category
    } else if (iconId === 'about') {
      setSelectedSubItem('background'); // First sub-category
    } else if (iconId === 'projects') {
      setSelectedSubItem('startup'); // First sub-category
    }
  };

  const handleSubItemClick = (subItemId: string) => {
    playNavSound();
    setSelectedSubItem(subItemId);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const icons = ['home', 'about', 'projects'];
    const currentIndex = icons.indexOf(selectedIcon);
    
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        if (currentIndex > 0) {
          handleIconClick(icons[currentIndex - 1]);
        }
        break;
      case 'ArrowRight':
        e.preventDefault();
        if (currentIndex < icons.length - 1) {
          handleIconClick(icons[currentIndex + 1]);
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (selectedIcon && subCategories[selectedIcon as keyof typeof subCategories]) {
          const subItems = subCategories[selectedIcon as keyof typeof subCategories];
          const currentSubIndex = selectedSubItem ? subItems.findIndex((item: any) => item.id === selectedSubItem) : -1;
          if (currentSubIndex < subItems.length - 1) {
            handleSubItemClick(subItems[currentSubIndex + 1].id);
          }
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (selectedSubItem) {
          setSelectedSubItem(null);
        }
        break;
    }
  };
  return (
    <>
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src="/audio/nav.mp3"
        preload="auto"
      />
      
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
      />
    </>
  );
}
