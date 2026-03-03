import { Link } from "react-router-dom"
import type { Section } from "../../types/content"

interface Props {
    section: Section;
}

export default function StaticSlider({ section }: Props) {
    const item = section.items?.[0];


if (!item) return null;

const imageUrl =
    item.images?.main?.url ||
    item.image?.url ||
    "https://placehold.co/1200x600";

const link = 
item.type === "edito___article"
? `/articles/${item.id}`
: `/videos/${item.id}`;

return (
  <section className="relative w-full h-[80vh] min-h-[500px]">
    <Link to={link} className="block w-full h-full">
      <div className="relative w-full h-full overflow-hidden">

        <img
          src={imageUrl}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-6 pb-16 text-white">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight max-w-3xl">
              {item.title}
            </h1>

            <div className="mt-6">
              <span className="inline-block bg-white text-black px-6 py-3 rounded-full font-semibold text-sm hover:bg-gray-200 transition">
                Lire l'article
              </span>
            </div>
          </div>
        </div>

      </div>
    </Link>
  </section>
);
}