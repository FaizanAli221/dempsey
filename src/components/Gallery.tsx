import { galleryImages } from "@/lib/data";

export default function Gallery() {
  return (
    <section id="gallery" className="bg-char">
      <div className="mx-auto max-w-6xl container-px py-16 lg:py-20">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cream">From the Kitchen &amp; Bar</h2>
          <p className="text-cream-dim mt-2 text-sm">A closer look at what leaves the pass every night</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 auto-rows-[130px] sm:auto-rows-[150px] gap-2 lg:gap-3">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-md ${img.span ?? ""}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
