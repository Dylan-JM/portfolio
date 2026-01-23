import { notFound } from "next/navigation";
import Image from "next/image";
import { projects } from "@/app/data/projects";
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

        {/* Video */}
        <VideoPlayer
          id={project.video}
          title={project.title}
          thumbnail={project.thumbnail} // optional
        />

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
