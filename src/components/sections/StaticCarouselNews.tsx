import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { Section } from "../../types/content";

interface Props {
  section: Section;
}

export default function StaticCarousel({ section }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const items = section.items ?? [];

  function getLink(type: string, slug: string) {
    if (type === "edito___article") return `/articles/${slug}`;
    if (type === "edito___video") return `/videos/${slug}`;
    return "#";
  }

  function next() {
    setCurrentIndex((prev) =>
      prev === items.length - 1 ? 0 : prev + 1
    );
  }

  function prev() {
    setCurrentIndex((prev) =>
      prev === 0 ? items.length - 1 : prev - 1
    );
  }

 
  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 4000);

    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <div className="relative w-full overflow-hidden mb-16">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {items.map((item) => (
          <Link
            key={item.id}
            to={getLink(item.type, item.id)}
            className="w-full flex-shrink-0"
          >
            <div className="relative w-full aspect-[16/9]">
              <img
                src={
                  item.image?.url ??
                  item.images?.main?.url ??
                  "https://placehold.co/1200x600"
                }
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-end p-8">
                <h2 className="text-white text-3xl font-bold">
                  {item.title}
                </h2>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 px-3 py-2 rounded shadow"
      >
        ←
      </button>

      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 px-3 py-2 rounded shadow"
      >
        →
      </button>
    </div>
  );
}