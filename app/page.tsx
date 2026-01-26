import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="min-h-screen w-full px-6 py-20">
      <div className="max-w-5xl mx-auto space-y-20">
        <Image
          src="/Graduate Picture.jpg" // replace with actual path
          alt="Dylan Marley"
          width={160}
          height={160}
          className="rounded-full border-4 border-slate-700 mx-auto mb-6"
        />
        {/* Hero Section */}
        <section className="space-y-6">
          <h1 className="text-5xl font-bold text-slate-50 leading-tight">
            Full Stack Developer
          </h1>

          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl">
            I’m Dylan Marley, a developer specialising in Web Development with
            Javascipt, NextJs, TypeScript and Game Development with Unreal
            Engine and C++ along with cloud-backed multiplayer systems. I build
            production-ready features for both web applications and games.
          </p>

          <div className="flex gap-4 pt-4">
            <Link
              href="/projects"
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg transition"
            >
              View Projects
            </Link>

            <Link
              href="/contact"
              className="border border-slate-700 hover:border-slate-500 text-slate-300 px-6 py-3 rounded-lg transition"
            >
              Contact Me
            </Link>
          </div>
        </section>

        {/* Skills Overview */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold text-slate-50">Core Skills</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-slate-300">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-slate-100">
                Game Development
              </h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Unreal Engine 5 (C++, Blueprints)</li>
                <li>Dedicated servers with AWS</li>
                <li>AI behaviour systems & Mass framework</li>
                <li>Gameplay mechanics & combat systems</li>
                <li>Multiplayer & replication</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-slate-100">
                Full Stack Development
              </h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Next.js, TypeScript, Express, React</li>
                <li>REST APIs & backend architecture</li>
                <li>MySQL, PostgreSQL, DynamoDB</li>
                <li>AWS (Cognito, Lambda, cloud services)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Recent Work CTA */}
        <section className="space-y-4">
          <h2 className="text-3xl font-semibold text-slate-50">Recent Work</h2>
          <p className="text-slate-300 max-w-2xl">
            I’ve worked across multiple startups, delivering gameplay systems,
            AI, backend services, and full stack features. Explore my latest
            projects below.
          </p>

          <Link
            href="/projects"
            className="inline-block text-indigo-400 hover:text-indigo-300 underline text-lg"
          >
            Browse all projects
          </Link>
        </section>
      </div>
    </main>
  );
}
