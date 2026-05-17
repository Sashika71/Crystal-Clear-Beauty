import { Link } from "react-router-dom";
import heroImage from "../../assets/images/heroimage.jpeg";
import Footer from "../../components/Footer";

const collectionPoints = [
  {
    title: "Glow-first formulas",
    text: "Soft textures, luminous finishes, and daily essentials that feel premium.",
  },
  {
    title: "Skin-friendly ritual",
    text: "A calm routine designed to look polished and feel easy every morning.",
  },
  {
    title: "Fast checkout flow",
    text: "Move from discovery to cart quickly, with a clean and simple shopping path.",
  },
];

const reviews = [
  {
    name: "Nimasha",
    text: "The layout feels premium and the products are easy to browse on mobile.",
  },
  {
    name: "Ishan",
    text: "The hero section gives the store a luxury look without feeling crowded.",
  },
  {
    name: "Ayesha",
    text: "The cart and login buttons are clear and the whole page feels polished.",
  },
];

export default function Home() {
  const imageSrc = heroImage;

  return (
    <div className="mx-auto flex w-full flex-col gap-10 py-3 lg:py-8">
      <section className="overflow-hidden w-full h-screen border-b border-pink-100 bg-white">
        <div className="grid h-full lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col justify-center gap-8 bg-[radial-gradient(circle_at_top_left,_rgba(251,207,232,0.92),_rgba(255,251,247,1)_58%,_rgba(255,255,255,1)_100%)] px-6 py-16 sm:px-12 lg:px-16 lg:py-20">
            <span className="text-xs font-semibold uppercase tracking-[0.45em] text-pink-800">
              New Collection
            </span>

            <div className="space-y-6">
              <h1 className="max-w-2xl text-5xl font-semibold leading-tight text-slate-950 sm:text-6xl lg:text-7xl">
                The Petal Dew Ritual
              </h1>
              <p className="max-w-lg text-lg leading-8 text-slate-600 sm:text-xl">
                Experience the softness of dewy skin, glowing tones, and a fragrance-light routine built for modern beauty.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                to="/products"
                className="inline-flex items-center justify-center rounded-full bg-pink-800 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-pink-200 transition hover:-translate-y-0.5 hover:bg-pink-900"
              >
                Shop Collection
              </Link>
              <Link
                to="/reviews"
                className="inline-flex items-center justify-center rounded-full border border-pink-200 bg-white px-8 py-3 text-base font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-pink-300 hover:text-pink-800"
              >
                View Reviews
              </Link>
            </div>
          </div>

          <div className="relative min-h-[420px] overflow-hidden bg-[#f7ebe7] lg:min-h-full">
            <img
              src={imageSrc}
              alt="Beauty campaign hero"
              className="h-full w-full object-cover object-center"
            />

            <div className="absolute inset-0 bg-gradient-to-l from-white/5 via-transparent to-black/12" />

            <div className="absolute bottom-8 left-6 right-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-xs rounded-3xl border border-white/50 bg-white/85 px-6 py-4 text-slate-800 shadow-xl backdrop-blur-md">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-pink-800">
                  Signature Look
                </p>
                <p className="mt-3 text-sm leading-6">
                  Soft glow, clean skin tones, and a luxury storefront feel.
                </p>
              </div>

              <div className="w-fit rounded-full border border-white/60 bg-white/80 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.3em] text-slate-700 shadow-lg backdrop-blur-md">
                Beauty store home
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-pink-800">
            Why Choose Us
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl">
            Designed for your beauty journey
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {collectionPoints.map((point) => (
            <article
              key={point.title}
              className="rounded-3xl border border-pink-100 bg-gradient-to-br from-pink-50 to-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-100">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900">{point.title}</h3>
              <p className="mt-3 text-base leading-7 text-slate-600">{point.text}</p>
            </article>
          ))}
        </div>
      </section>

     

      <Footer />
    </div>
  );
}