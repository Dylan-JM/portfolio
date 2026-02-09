import ProjectCard from "@/app/_components/ProjectCard";
import { Project } from "@/app/_types/project";

type Props = {
  projects: Project[];
  onProjectClick: (project: Project) => void;
};

export function ProjectsGrid({ projects, onProjectClick }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto pr-2">
      {projects.map((project) => (
        <ProjectCard key={project.title} project={project} onProjectClick={onProjectClick} />
      ))}
    </div>
  );
}
