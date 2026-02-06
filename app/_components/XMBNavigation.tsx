'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '@/app/_data/projects';
import XMBSubContent from './XMBSubContent';
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
      { id: 'experience', label: 'Experience', icon: '💼', description: '5+ years building production applications and games' },
      { id: 'contact', label: 'Contact', icon: '📧', description: 'Available for freelance projects and collaborations' }
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

  const handleCategoryClick = (categoryId: string) => {
    playNavSound();
    setSelectedCategory(categoryId);
    setSelectedProject(null);
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

  const selectedCategoryData = projectCategories.find(cat => cat.id === selectedCategory);
  const selectedSubItemData = selectedSubItem ? 
    (subCategories[selectedIcon as keyof typeof subCategories] as any[])?.find((item: any) => item.id === selectedSubItem) : null;

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
      {selectedIcon === 'home' && selectedSubItem && (
        <XMBSubContent
          icon={selectedSubItemData?.icon}
          title={selectedSubItemData?.label}
          description={selectedSubItemData?.description}
          isActive={true}
        />
      )}

      {selectedIcon === 'about' && selectedSubItem && (
        <XMBSubContent
          icon={selectedSubItemData?.icon}
          title={selectedSubItemData?.label}
          description={selectedSubItemData?.description}
          isActive={true}
        />
      )}

      {/* Projects Display */}
      {selectedIcon === 'projects' && (
        <>
          {/* Projects Display - Right Side */}
          {selectedCategory && selectedCategoryData && (
            <div className="absolute right-8 top-1/2 transform -translate-y-1/2 w-96 max-h-96 overflow-y-auto">
              <h3 className="text-xl font-semibold text-pink-500 mb-4">
                {selectedCategoryData.label}
              </h3>
              <div className="space-y-4">
                {selectedCategoryData.projects.map((project, index) => (
                  <div
                    key={project.slug}
                    ref={(el) => {
                      projectRefs.current[index] = el;
                    }}
                    className={`bg-card/30 backdrop-blur-sm border border-border rounded-xl p-4 cursor-pointer transition-all duration-300 ${
                      selectedProject === project.slug
                        ? 'ring-2 ring-pink-500 scale-105'
                        : 'hover:scale-102'
                    }`}
                    onClick={() => setSelectedProject(project.slug)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-foreground mb-2">
                          {project.title}
                        </h4>
                        <p className="text-muted-foreground text-sm mb-3">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.tech.slice(0, 3).map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-2 py-1 bg-pink-500/20 text-pink-500 text-xs rounded-md"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.tech.length > 3 && (
                            <span className="px-2 py-1 bg-pink-500/20 text-pink-500 text-xs rounded-md">
                              +{project.tech.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                      {project.website && (
                        <div className="flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300">
                          <span>🔗</span>
                          <span>Live Demo</span>
                        </div>
                      )}
                      {project.thumbnail && (
                        <div className="ml-4">
                          <Image
                            src={project.thumbnail} 
                            alt={project.title}
                            className="w-16 h-16 rounded-lg object-cover"
                            width={64}
                            height={64}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
