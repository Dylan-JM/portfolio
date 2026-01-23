export default function ContactPage() {
  return (
    <main className="min-h-screen w-full px-6 py-16">
      <div className="max-w-3xl mx-auto space-y-10">
        {/* Title */}
        <h1 className="text-4xl font-bold text-slate-50">Contact</h1>

        {/* Intro */}
        <p className="text-slate-300 text-lg leading-relaxed">
          If you’d like to get in touch about work, collaboration, or anything
          development‑related, feel free to reach out using any of the methods
          below. I’m always open to discussing new opportunities and interesting
          projects.
        </p>

        {/* Contact Methods */}
        <div className="space-y-6">
          {/* Email */}
          <div>
            <h2 className="text-xl font-semibold text-slate-50">Email</h2>
            <a
              href="mailto:dylan.james.marley@gmail.com"
              className="text-indigo-400 hover:text-indigo-300 transition underline"
            >
              dylan.james.marley@gmail.com
            </a>
          </div>

          {/* GitHub */}
          <div>
            <h2 className="text-xl font-semibold text-slate-50">GitHub</h2>
            <a
              href="https://github.com/Dylan-JM"
              target="_blank"
              className="text-indigo-400 hover:text-indigo-300 transition underline"
            >
              github.com/Dylan-JM
            </a>
          </div>

          {/* LinkedIn */}
          <div>
            <h2 className="text-xl font-semibold text-slate-50">LinkedIn</h2>
            <a
              href="https://www.linkedin.com/in/dylan-marley-a439bb1b8/"
              target="_blank"
              className="text-indigo-400 hover:text-indigo-300 transition underline"
            >
              linkedin.com/in/dylan-marley-a439bb1b8
            </a>
          </div>
        </div>

        {/* Closing */}
        <p className="text-slate-400 text-sm pt-6">
          I look forward to hearing from you.
        </p>
      </div>
    </main>
  );
}
