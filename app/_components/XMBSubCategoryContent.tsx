'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ProjectsGrid } from './ProjectsGrid';
import { projectCategories } from '@/app/_data/categories';
import { Project } from '@/app/_types/project';
import ProjectDetailModal from './ProjectDetailModal';

interface XMBSubCategoryContentProps {
  selectedIcon: string;
  selectedSubItem: string | null;
  contentOffset?: string;
}

export default function XMBSubCategoryContent({ selectedIcon, selectedSubItem, contentOffset }: XMBSubCategoryContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  useEffect(() => {
    if (selectedIcon && selectedSubItem && contentRef.current) {
      gsap.fromTo(contentRef.current,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [selectedIcon, selectedSubItem]);

  const renderContent = () => {
    if (!selectedIcon || !selectedSubItem) return null;

    switch (selectedIcon) {
      case 'home':
        switch (selectedSubItem) {
          case 'about':
            return (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-foreground">Full Stack Developer</h3>
                <p className="text-muted-foreground leading-relaxed">
                  I&apos;m Dylan Marley, a developer specialising in Web Development with Javascript, NextJs, TypeScript and Game Development with Unreal Engine and C++ along with cloud-backed multiplayer systems. I build production-ready features for both web applications and games.
                </p>
              </div>
            );
          case 'skills':
            return (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-foreground">Core Skills</h3>
                <div className="grid grid-cols-2 gap-4 text-muted-foreground">
                  <div>
                    <h4 className="text-xl font-semibold text-foreground mb-2">Full Stack Development</h4>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Next.js, TypeScript, Express, React</li>
                      <li>REST APIs & backend architecture</li>
                      <li>MySQL, PostgreSQL, DynamoDB</li>
                      <li>AWS (Cognito, Lambda, cloud services)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-foreground mb-2">Game Development</h4>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Unreal Engine 5 (C++, Blueprints)</li>
                      <li>Dedicated servers with AWS</li>
                      <li>AI behaviour systems & Mass framework</li>
                      <li>Gameplay mechanics & combat systems</li>
                      <li>Multiplayer & replication</li>
                    </ul>
                  </div>
                </div>
              </div>
            );
          case 'what-i-do':
            return (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-foreground">What I Do</h3>
                <p className="text-muted-foreground leading-relaxed">
                  My work spans gameplay programming, backend development, and systems design. I build clean, maintainable codebases and focus on delivering features that scale — whether that&apos;s multiplayer combat systems, AI frameworks, or full stack web applications. I&apos;ve worked across multiple startups, often taking ownership of architecture, code quality, and mentoring other developers.
                </p>
              </div>
            );
          case 'technical-focus':
            return (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-foreground">Technical Focus</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Unreal Engine 5 — C++, AI, Mass framework, gameplay systems</li>
                  <li>Multiplayer systems, replication, and cloud-backed services</li>
                  <li>React, Next.js, Express, REST APIs, full stack web development</li>
                  <li>SQL (MySQL, PostgreSQL) and AWS (DynamoDB, Cognito)</li>
                  <li>Scalable architecture, debugging, and performance-focused development</li>
                </ul>
              </div>
            );
          case 'background':
            return (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-foreground">Background</h3>
                <p className="text-muted-foreground leading-relaxed">
                  I hold a BSc (Hons) in Computer Games Technology and I have completed a Software Development Bootcamp with Tech Educators. My experience includes leading development on an MMORPG and Looter Arena game, implementing AI and gameplay systems in Unreal Engine, and delivering full stack features for web platforms.
                </p>
              </div>
            );
          case 'how-i-work':
            return (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-foreground">How I Work</h3>
                <p className="text-muted-foreground leading-relaxed">
                  I&apos;m detail‑oriented, direct, and focused on building systems that are robust, scalable, and easy to maintain. I avoid unnecessary complexity, keep logic modular, and iterate until everything feels solid. I&apos;m comfortable taking ownership of features, mentoring teammates, and driving projects forward.
                </p>
              </div>
            );
          case 'outside-of-work':
            return (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-foreground">Outside of Work</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Outside of development, I&apos;m usually experimenting with new tools, refining gameplay prototypes, or learning new technologies that push my projects and skillset forward.
                </p>
              </div>
            );
          default:
            return null;
        }
      case 'projects':
        if (!selectedSubItem) {
          return (
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground">Projects</h3>
              <p className="text-muted-foreground">Select a project category to view details</p>
            </div>
          );
        }
        
        const category = projectCategories.find(cat => cat.id === selectedSubItem);
        if (!category) {
          return (
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground">Projects</h3>
              <p className="text-muted-foreground">Category not found</p>
            </div>
          );
        }

        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-foreground">{category.label}</h3>
            <p className="text-muted-foreground text-sm">{category.icon} {category.projects.length} projects</p>
            {category.projects.length > 0 ? (
              <ProjectsGrid projects={category.projects} onProjectClick={handleProjectClick} />
            ) : (
              <p className="text-muted-foreground">No projects in this category yet.</p>
            )}
          </div>
        );
      case 'contact':
        switch (selectedSubItem) {
          case 'email':
            return (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-foreground">Contact</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  If you&apos;d like to get in touch about work, collaboration, or anything development‑related, feel free to reach out using any of the methods below. I&apos;m always open to discussing new opportunities and interesting projects.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">📧</span>
                    <div>
                      <h4 className="text-lg font-semibold text-foreground">Email</h4>
                      <a 
                        href="mailto:dylan.james.marley@gmail.com" 
                        className="text-primary hover:text-primary/80 transition-colors underline"
                      >
                        dylan.james.marley@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          case 'github':
            return (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-foreground">Contact</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  If you&apos;d like to get in touch about work, collaboration, or anything development‑related, feel free to reach out using any of the methods below. I&apos;m always open to discussing new opportunities and interesting projects.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🐙</span>
                    <div>
                      <h4 className="text-lg font-semibold text-foreground">GitHub</h4>
                      <a 
                        href="https://github.com/Dylan-JM" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 transition-colors underline"
                      >
                        github.com/Dylan-JM
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          case 'linkedin':
            return (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-foreground">Contact</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  If you&apos;d like to get in touch about work, collaboration, or anything development‑related, feel free to reach out using any of the methods below. I&apos;m always open to discussing new opportunities and interesting projects.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">💼</span>
                    <div>
                      <h4 className="text-lg font-semibold text-foreground">LinkedIn</h4>
                      <a 
                        href="https://linkedin.com/in/dylan-marley-a439bb1b8" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 transition-colors underline"
                      >
                        linkedin.com/in/dylan-marley-a439bb1b8
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          default:
            return null;
        }
      default:
        return null;
    }
    
  };

  if (!selectedIcon || !selectedSubItem) return null;

  return (
    <>
      <div 
        ref={contentRef}
        className={`absolute ${selectedIcon === 'projects' ? 'w-[1000px]' : 'w-[600px]'} ${selectedIcon === 'projects' ? 'max-h-128' : 'max-h-96'} overflow-y-auto transition-opacity duration-500 opacity-100 top-96 ${contentOffset} ${selectedIcon === 'contact' ? 'ml-[10px]' : ''}`}
      >
        <div className="bg-card/30 backdrop-blur-sm border border-border rounded-xl p-6">
          {renderContent()}
        </div>
      </div>
      
      <ProjectDetailModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
