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

          return (
            <Link
              key={item.id}
              to={getLink(item.type, item.id)}
              className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden"
            >
              <img
                src={
                  item.images?.main?.url ||
                  "https://placehold.co/600x400"
                }
                alt={item.title}
                className="w-full h-52 object-cover"
              />

              <div className="p-4">
                <h3 className="font-semibold text-lg line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                  {item.type === "edito___article" ? "Article" : "Vidéo"}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}