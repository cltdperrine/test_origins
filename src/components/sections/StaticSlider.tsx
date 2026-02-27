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
? `articles/${item.slug}`
: `videos/${item.slug}`;

return (
    <Link to={link} className="block mb-16">
        <div className="relative rounded-2xl overflow-hidden group">
            <img
            src={imageUrl}
            alt={item.title}
            className="w-full h-[400px] md:h-[500px] object-cover transition-transform duration-500 group-hover:scale-105" />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

            <div className="absolute bottom-8 left-8 text-white max-w-2xl">
                <h1 className="text-2xl md:text-4xl font-bold leading-tight">{item.title}</h1>

            </div>

 

        </div>
    </Link>
)
}