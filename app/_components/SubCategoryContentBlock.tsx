"use client";

import type {
  ContentConfig,
  ContentParagraph,
  ContentList,
  ContentGrid,
  ContentContact,
} from "@/app/_data/subCategoryContent";
import type { Project } from "@/app/_types/project";
import { ProjectsGrid } from "./ProjectsGrid";

interface SubCategoryContentBlockProps {
  content?: ContentConfig;
  onProjectClick?: (project: Project) => void;
  projects?: Project[];
  categoryLabel?: string;
  categoryIcon?: string;
}

export default function SubCategoryContentBlock({
  content = { type: "paragraph", title: "", body: "" },
  onProjectClick,
  projects = [],
  categoryLabel,
  categoryIcon,
}: SubCategoryContentBlockProps) {
  // Projects: rendered with dynamic category data
  if (categoryLabel && onProjectClick) {
    return (
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-foreground">{categoryLabel}</h3>
        <p className="text-muted-foreground text-sm">
          {categoryIcon} {projects.length} projects
        </p>
        {projects.length > 0 ? (
          <ProjectsGrid projects={projects} onProjectClick={onProjectClick} />
        ) : (
          <p className="text-muted-foreground">
            No projects in this category yet.
          </p>
        )}
      </div>
    );
  }

  if (content.type === "paragraph") {
    const { title, body } = content as ContentParagraph;
    return (
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-foreground">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{body}</p>
      </div>
    );
  }

  if (content.type === "list") {
    const { title, items } = content as ContentList;
    return (
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-foreground">{title}</h3>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    );
  }

  if (content.type === "grid") {
    const { title, sections } = content as ContentGrid;
    return (
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-foreground">{title}</h3>
        <div className="grid grid-cols-2 gap-4 text-muted-foreground">
          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="text-xl font-semibold text-foreground mb-2">
                {section.title}
              </h4>
              <ul className="list-disc list-inside space-y-1">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (content.type === "contact") {
    const { intro, items } = content as ContentContact;
    return (
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-foreground">Contact</h3>
        <p className="text-muted-foreground leading-relaxed mb-6">{intro}</p>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.label} className="flex items-center space-x-3">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <h4 className="text-lg font-semibold text-foreground">
                  {item.label}
                </h4>
                <a
                  href={item.href}
                  target={item.href.startsWith("mailto") ? undefined : "_blank"}
                  rel={
                    item.href.startsWith("mailto")
                      ? undefined
                      : "noopener noreferrer"
                  }
                  className="text-primary hover:text-primary/80 transition-colors underline"
                >
                  {item.text}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
