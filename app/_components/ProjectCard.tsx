import Image from "next/image";
import type { Project } from "@/app/_types/project";

interface ProjectCardProps {
  project: Project;
  onProjectClick: (project: Project) => void;
}

export default function ProjectCard({ project, onProjectClick }: ProjectCardProps) {
  return (
    <button
      onClick={() => onProjectClick(project)}
      className="
        block
        bg-card/50
        backdrop-blur-sm
        border
        border-border
        rounded-xl
        p-4
        shadow-md
        transition
        hover:-translate-y-1
        hover:shadow-xl
        hover:bg-card/70
        text-left w-full
        cursor-pointer
      "
    >
      {project.thumbnail && (
        <div className="mb-3 rounded-lg overflow-hidden">
          <Image
            src={project.thumbnail}
            alt={project.title}
            width={400}
            height={250}
            className="rounded-md object-cover w-full h-auto"
          />
        </div>
      )}

      <h3 className="text-lg font-bold text-foreground mb-2">{project.title}</h3>

      <p className="text-sm text-muted-foreground mb-3">{project.description}</p>

      {project.date && <p className="text-muted-foreground text-xs mb-3">{project.date}</p>}

      <div className="flex flex-wrap gap-1 text-xs">
        {project.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="bg-primary/20 text-primary px-2 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
        {project.tags.length > 4 && (
          <span className="text-muted-foreground px-2 py-1">
            +{project.tags.length - 4}
          </span>
        )}
      </div>
    </button>
  );
}
