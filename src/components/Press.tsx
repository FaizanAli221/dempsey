export default function Press() {
  return (
    <section className="bg-cream text-char">
      <div className="mx-auto max-w-5xl container-px py-16 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-14 items-center">
          <div>
            <p className="text-xs font-semibold tracking-[0.15em] text-olive">FEATURED PRESS</p>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold mt-3 leading-snug">
              Does a Wichita spot serve the best cheeseburger in Kansas? Yelp reviewers think so.
            </h2>
            <p className="mt-4 text-sm text-char/70 leading-relaxed">
              Local diners have been vocal about it, and the reviews keep stacking up — Dempsey&apos;s Burger Pub
              has become the name Wichita reaches for when the cheeseburger conversation comes up.
            </p>
            <p className="mt-4 text-sm font-medium text-char/60">By Lindsay Smith · The Wichita Eagle</p>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1553979459-d2229ba7433b?q=80&w=1000&auto=format&fit=crop"
              alt="A loaded cheeseburger with fresh vegetables next to a side of fries"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
