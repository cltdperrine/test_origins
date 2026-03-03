import { Link } from "react-router-dom";
import type { Section } from "../../types/content";

interface Props {
  section: Section;
}

export default function StaticGridNews({ section }: Props) {

  function getLink(type: string, id: string) {
    if (type === "edito___article") return `/articles/${id}`;
    if (type === "edito___video") return `/videos/${id}`;
    return "#";
  }

  return (
    <div className="mb-16 container mx-auto px-10">
      <h2 className="text-2xl font-bold mb-6">
        LES ACTUALITÉS
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {section.items?.map((item) => {
          const imageUrl =
            item.images?.main?.url ||
            "https://placehold.co/600x400";

          return (
            <Link
              key={item.id}
              to={getLink(item.type, item.id)}
              className="bg-white block rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={imageUrl}
                alt={item.title}
                className="w-full h-52 object-cover"
              />

              <div className="p-6">

                <span className="text-xs uppercase tracking-wide text-gray-400">
                  {item.type === "edito___article" ? "Article" : "Vidéo"}
                </span>

                <h3 className="mt-2 text-xl font-semibold text-gray-900 line-clamp-2">
                  {item.title}
                </h3>

              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}