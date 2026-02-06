'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '@/app/_data/projects';
import XMBContent from './XMBContent';
import XMBSubContent from './XMBSubContent';
import XMBSystemInfo from './XMBSystemInfo';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function XMBNavigation() {
  const [selectedIcon, setSelectedIcon] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [selectedSubItem, setSelectedSubItem] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const categoryRefs = useRef<(HTMLDivElement | null)[]>([]);
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
      { id: 'profile', label: 'Profile', icon: '👤', description: 'Full-stack developer with expertise in modern web technologies' },
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

  useEffect(() => {
    // Animate icons on mount
    gsap.fromTo(iconRefs.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" }
    );

    // Animate sub-items when main icon is selected
    if (selectedIcon && subCategories[selectedIcon as keyof typeof subCategories]) {
      gsap.fromTo(categoryRefs.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: "power2.out" }
      );
    }

    // Animate projects when category is selected
    if (selectedCategory && projectCategories.find(cat => cat.id === selectedCategory)) {
      gsap.fromTo(projectRefs.current,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, ease: "power2.out" }
      );
    }
  }, [selectedIcon, selectedCategory]);

  const handleIconClick = (iconId: string) => {
    playNavSound();
    setSelectedIcon(iconId);
    setSelectedCategory(null);
    setSelectedProject(null);
    setSelectedSubItem(null);
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
          const currentSubIndex = selectedSubItem ? subItems.findIndex(item => item.id === selectedSubItem) : -1;
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
    subCategories[selectedIcon as keyof typeof subCategories]?.find(item => item.id === selectedSubItem) : null;

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
            onClick={() => handleIconClick('home')}
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
            onClick={() => handleIconClick('about')}
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
            onClick={() => handleIconClick('projects')}
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
                    categoryRefs.current[index] = el;
                  }}
                  className={`relative cursor-pointer transition-all duration-300 ${
                    selectedSubItem === subItem.id
                      ? 'scale-110 text-blue-500'
                      : 'scale-100 text-foreground hover:text-blue-500/70'
                  }`}
                  onClick={() => handleSubItemClick(subItem.id)}
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
                    categoryRefs.current[index] = el;
                  }}
                  className={`relative cursor-pointer transition-all duration-300 ${
                    selectedSubItem === subItem.id
                      ? 'scale-110 text-purple-600'
                      : 'scale-100 text-foreground hover:text-purple-600/70'
                  }`}
                  onClick={() => handleSubItemClick(subItem.id)}
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
                    categoryRefs.current[index] = el;
                  }}
                  className={`relative cursor-pointer transition-all duration-300 ${
                    selectedSubItem === subItem.id
                      ? 'scale-110 text-pink-500'
                      : 'scale-100 text-foreground hover:text-pink-500/70'
                  }`}
                  onClick={() => handleSubItemClick(subItem.id)}
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
      </div>

      {/* Content Display */}
      {selectedIcon === 'home' && !selectedSubItem && (
        <XMBContent
          title="Dylan Marley"
          description="Full Stack Developer & Game Developer"
          icon="🏠"
          isActive={true}
        />
      )}
      
      {selectedIcon === 'home' && selectedSubItem && (
        <XMBSubContent
          icon={selectedSubItemData.icon}
          title={selectedSubItemData.label}
          description={selectedSubItemData.description}
          isActive={true}
        />
      )}

      <XMBContent
        title="About Me"
        description="Developer specializing in Web Development, Game Development, and innovative solutions"
        icon="👤"
        isActive={selectedIcon === 'about' && !selectedSubItem}
      >
        {selectedSubItemData && (
          <XMBSubContent
            icon={selectedSubItemData.icon}
            title={selectedSubItemData.label}
            description={selectedSubItemData.description}
            isActive={!!selectedSubItemData}
          />
        )}
      </XMBContent>

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
                        {project.website && (
                          <div className="flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300">
                            <span>🔗</span>
                            <span>Live Demo</span>
                          </div>
                        )}
                      </div>
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
