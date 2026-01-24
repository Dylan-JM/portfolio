import { projects } from "@/app/data/projects";
import ProjectCard from "@/app/components/ProjectCard";

export default function ProjectsPage() {
  const startupCompanies = projects.filter((p) => p.category === "startup");
  const gameProjects = projects.filter((p) => p.category === "game");
  const webProjects = projects.filter((p) => p.category === "web");

  return (
    <main className="min-h-screen w-full px-6 py-16">
      <div className="max-w-6xl mx-auto space-y-16">
        <section>
          <h2 className="text-3xl font-bold text-slate-50 mb-8">
            Startup Companies
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {startupCompanies.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-3xl font-bold text-slate-50 mb-8">
            Web Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {webProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-50 mb-8">
            Game Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {gameProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
