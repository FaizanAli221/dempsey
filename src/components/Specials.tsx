import { specials } from "@/lib/data";

export default function Specials() {
  return (
    <section id="specials" className="bg-cheddar relative overflow-hidden">
      <div className="mx-auto max-w-5xl container-px py-16 lg:py-20 text-center">
        <p className="font-serif italic text-char/70 text-lg">Every Sip and Bite Is a Celebration</p>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-char mt-2">What We&apos;re Known For</h2>

        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:gap-x-10">
          {specials.map((item) => (
            <div key={item.title} className="flex flex-col items-center">
              <div className="h-28 w-28 sm:h-36 sm:w-36 rounded-full overflow-hidden ring-4 ring-char/10 shadow-lg">
                <img src={item.img} alt={item.title} className="h-full w-full object-cover" />
              </div>
              <h3 className="font-serif font-bold text-char mt-4 text-base sm:text-lg">{item.title}</h3>
              <p className="text-char/70 text-xs sm:text-sm mt-1 max-w-[10rem]">{item.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
