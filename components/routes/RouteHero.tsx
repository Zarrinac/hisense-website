// Slim hero block for route landing pages.
type RouteHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export default function RouteHero({ eyebrow, title, description }: RouteHeroProps) {
  return (
    <section className="bg-(--surface-muted-color) px-6 py-20 text-(--default-black-font)">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-xs uppercase tracking-[0.6em] text-(--text-subtle-color)">{eyebrow}</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">{title}</h1>
        <p className="mt-5 text-lg leading-relaxed text-(--text-muted-color)">{description}</p>
      </div>
    </section>
  );
}
