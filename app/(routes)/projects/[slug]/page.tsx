import { notFound } from "next/navigation";
import { projects } from "@/app/_data/projects";
import Gallery from "./Gallery";
import VideoPlayer from "./VideoPlayer";

export default async function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) return notFound();

  return (
    <main className="min-h-screen w-full px-6 py-16">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Title */}
        <h1 className="text-4xl font-bold text-slate-50">{project.title}</h1>

        {/* Video (optional) */}
        {project.video && (
          <VideoPlayer
            id={project.video}
            title={project.title}
            thumbnail={project.thumbnail}
          />
        )}

        {/* External Links */}
        <div className="flex flex-col gap-3">
          {/* Server Wake-Up Link (optional) */}
          {project.server && (
            <div className="flex flex-col gap-1">
              <a
                href={project.server}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-medium transition"
              >
                Wake Server
              </a>

              <p className="text-sm text-slate-400">
                Please wake the server before visiting the website (Render cold
                start).
              </p>
            </div>
          )}

          {/* Website (optional) */}
          {project.website && (
            <a
              href={project.website}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition"
            >
              Visit Website
            </a>
          )}

          {/* GitHub (optional) */}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-medium transition"
            >
              View GitHub Repo
            </a>
          )}
        </div>

        {/* Description */}
        <p className="text-slate-300 text-lg leading-relaxed">
          {project.longDescription}
        </p>

        {/* Features */}
        {project.features.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold text-slate-50 mb-4">
              Features
            </h2>
            <ul className="list-disc list-inside space-y-2 text-slate-300">
              {project.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Tech Stack */}
        {project.tech.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold text-slate-50 mb-4">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="bg-indigo-500 text-slate-50 px-3 py-1 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Gallery */}
        {project.images && project.images.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold text-slate-50 mb-4">
              Gallery
            </h2>
            <Gallery images={project.images} title={project.title} />
          </section>
        )}
      </div>
    </main>
  );
}
