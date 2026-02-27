import { Link } from "react-router-dom";
import type { Section } from "../../types/content";

interface Props {
    section: Section;
}

export default function StaticCarousel({ section }: Props) {
    function getLink(type: string, slug: string) {
        if (type === "edito___article") return `/articles/${slug}`;
        if (type === "edito___video") return `/videos/${slug}`;
        return "#";
    }

    return (
        <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Les dernières nouvelles</h2>

            <div className="w-full overflow-x-auto">
                <div className="flex gap-6 w-max px-2">{section.items?.map((item) => (
                    <Link
                        key={item.id}
                        to={getLink(item.type, item.slug)}
                        className="flex-shrink-0 w-[300px] bg-white rounded-xl shadow hover:shadow-xl transition">
                        <img
                            src={
                                item.image?.url ||
                                item.images?.main?.url ||
                                "https://placehold.co/600x400"
                            }
                            alt={item.title}
                            className="w-full h-48 object-cover rounded-t-xl"
                        />

                        <div className="p-4">
                            <h3 className="font-semibold text-lg line-clamp-2">{item.title}</h3>

                        </div>
                    </Link>
                ))}

                </div>

            </div>
        </div>
    )
}