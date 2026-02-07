'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface XMBSubCategoryContentProps {
  selectedIcon: string;
  selectedSubItem: string | null;
}

export default function XMBSubCategoryContent({ selectedIcon, selectedSubItem }: XMBSubCategoryContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

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
      case 'about':
        switch (selectedSubItem) {
          case 'background':
            return (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-foreground">Background</h3>
                <p className="text-muted-foreground">Self-taught developer passionate about creating innovative solutions</p>
              </div>
            );
          case 'education':
            return (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-foreground">Education</h3>
                <p className="text-muted-foreground">Continuous learning through online courses and hands-on projects</p>
              </div>
            );
          case 'interests':
            return (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-foreground">Interests</h3>
                <p className="text-muted-foreground">Game development, AI/ML, system architecture, user experience</p>
              </div>
            );
          case 'goals':
            return (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-foreground">Goals</h3>
                <p className="text-muted-foreground">Build scalable applications and contribute to open-source projects</p>
              </div>
            );
          default:
            return null;
        }
      case 'projects':
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-foreground">Projects</h3>
            <p className="text-muted-foreground">Select a project category to view details</p>
          </div>
        );
      default:
        return null;
    }
  };

  if (!selectedIcon || !selectedSubItem) return null;

  return (
    <div 
      ref={contentRef}
      className="absolute top-96 right-1/4 w-[600px] max-h-96 overflow-y-auto transition-opacity duration-500 opacity-100"
    >
      <div className="bg-card/30 backdrop-blur-sm border border-border rounded-xl p-6">
        {renderContent()}
      </div>
    </div>
  );
}
