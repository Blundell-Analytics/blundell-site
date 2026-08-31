export default function ClosingCta() {
  return (
    <section className="bg-ink relative z-10 py-20 lg:py-32">
      <div className="shell px-6 text-center lg:px-8">
        <h2 className="display-xl mx-auto max-w-4xl text-white">
          More time deciding,
          <br />
          less time guessing.
        </h2>
        <p className="mx-auto mt-6 max-w-md text-base text-neutral-400">
          A defensible shortlist in weeks, not seasons.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a href="#contact" className="btn-mono btn-primary">
            Request a Report
          </a>
          <a href="#scoring" className="btn-mono btn-ghost">
            How Scoring Works
          </a>
        </div>
      </div>
    </section>
  );
}
