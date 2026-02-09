'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Project } from '@/app/_types/project';
import Gallery from './Gallery';
import VideoPlayer from './VideoPlayer';

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectDetailModal({ project, isOpen, onClose }: ProjectDetailModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && modalRef.current && contentRef.current) {
      // Animate modal background
      gsap.fromTo(modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );

      // Animate content
      gsap.fromTo(contentRef.current,
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" }
      );

      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else if (!isOpen) {
      // Restore body scroll
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    if (modalRef.current && contentRef.current) {
      // Animate out
      gsap.to(contentRef.current, {
        opacity: 0,
        scale: 0.9,
        y: 20,
        duration: 0.3,
        ease: "power2.in"
      });

      gsap.to(modalRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
        onComplete: onClose
      });
    } else {
      onClose();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!project || !isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        ref={contentRef}
        className="bg-card/50 backdrop-blur-md border border-border rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
      >
        {/* Scrollable content */}
        <div className="overflow-y-auto scrollbar-overlay max-h-[90vh] p-8 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold text-foreground">{project.title}</h1>
            <button
              onClick={handleClose}
              className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-card/80"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Note */}
          {project.note && (
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
              <p className="text-sm text-yellow-600 dark:text-yellow-400">{project.note}</p>
            </div>
          )}

          {/* Video */}
          {project.video && (
            <VideoPlayer
              id={project.video}
              title={project.title}
              thumbnail={project.thumbnail}
            />
          )}

          {/* External Links */}
          <div className="flex flex-wrap gap-3">
            {project.server && (
              <div className="w-full">
                <a
                  href={project.server}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-card/80 hover:bg-card text-foreground px-6 py-3 rounded-lg font-medium transition border border-border"
                >
                  Wake Server
                </a>
                <p className="text-sm text-muted-foreground mt-1">
                  Please wake the server before visiting the website (Render cold start).
                </p>
              </div>
            )}

            {project.website && (
              <a
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-medium transition"
              >
                Visit Website
              </a>
            )}

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-card/80 hover:bg-card text-foreground px-6 py-3 rounded-lg font-medium transition border border-border"
              >
                View GitHub Repo
              </a>
            )}
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Description</h2>
            <p className="text-muted-foreground leading-relaxed">
              {project.longDescription}
            </p>
          </div>

          {/* Features */}
          {project.features.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">Features</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                {project.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack */}
          {project.tech.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">Tech Stack and Skills</h2>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm border border-primary/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Gallery */}
          {project.images && project.images.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">Gallery</h2>
              <Gallery images={project.images} title={project.title} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
