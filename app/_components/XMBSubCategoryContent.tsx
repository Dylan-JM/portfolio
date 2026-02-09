"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { projectCategories } from "@/app/_data/categories";
import { subCategoryContent } from "@/app/_data/subCategoryContent";
import type { Project } from "@/app/_types/project";
import ProjectDetailModal from "./ProjectDetailModal";
import SubCategoryContentBlock from "./SubCategoryContentBlock";

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
        className={`absolute left-[18%] ${selectedIcon === "projects" ? "w-[1000px]" : "w-[600px]"} ${selectedIcon === "projects" ? "max-h-128" : "max-h-96"} overflow-y-auto transition-opacity duration-500 opacity-100 top-96`}
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
