"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { projectCategories } from "@/app/_data/categories";
import { subCategoryContent } from "@/app/_data/subCategoryContent";
import type { Project } from "@/app/_types/project";
import ProjectDetailModal from "./ProjectDetailModal";
import SubCategoryContentBlock from "./SubCategoryContentBlock";
import ChatInterface from "./ChatInterface";

interface XMBSubCategoryContentProps {
  selectedIcon: string;
  selectedSubItem: string | null;
}

export default function XMBSubCategoryContent({
  selectedIcon,
  selectedSubItem,
}: XMBSubCategoryContentProps) {
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
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" },
      );
    }
  }, [selectedIcon, selectedSubItem]);

  const renderContent = () => {
    if (!selectedIcon || !selectedSubItem) return null;

    if (selectedIcon === "chat") {
      return <ChatInterface />;
    }

    // Projects: special handling with dynamic category data
    if (selectedIcon === "projects") {
      const category = projectCategories.find(
        (cat) => cat.id === selectedSubItem,
      );
      if (!category) {
        return (
          <SubCategoryContentBlock
            content={{
              type: "paragraph",
              title: "Projects",
              body: "Category not found",
            }}
          />
        );
      }
      return (
        <SubCategoryContentBlock
          content={{ type: "paragraph", title: category.label, body: "" }}
          onProjectClick={handleProjectClick}
          projects={category.projects}
          categoryLabel={category.label}
          categoryIcon={category.icon}
        />
      );
    }

    // Look up from config (home, contact)
    const contentConfig = subCategoryContent[selectedIcon]?.[selectedSubItem];
    if (!contentConfig) return null;

    return <SubCategoryContentBlock content={contentConfig} />;
  };

  if (!selectedIcon || !selectedSubItem) return null;

  return (
    <>
      <div
        ref={contentRef}
        className={`shrink-0 min-w-0 md:mt-28 md:-ml-24 px-2 md:px-0 outline-none focus:outline-none focus-visible:outline-none transition-opacity duration-500 opacity-100 ${
          selectedIcon === "chat"
            ? "w-full max-w-full"
            : selectedIcon === "projects"
            ? "w-full max-w-full md:max-w-[min(1000px,45vw)] max-h-full md:max-h-128 overflow-y-auto scrollbar-overlay"
            : "w-full max-w-full md:max-w-[min(600px,35vw)] max-h-full md:max-h-96 overflow-y-auto scrollbar-overlay"
        }`}
      >
        <div className={`bg-card/30 backdrop-blur-sm border border-border rounded-xl ${selectedIcon === "chat" ? "overflow-hidden flex flex-col p-0 h-95" : "p-6"}`}>
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
