import type { Section } from "../../types/content";
import SectionFallback from "./SectionFallback";
import StaticGridNews from "./StaticGridNews";
import StaticSlider from "./StaticSlider";
import StaticCarousel from "./StaticCarouselNews";


interface Props {
    section: Section;
}

// RENDER pour rendre dynamiquement la bonne section en fonction du type
export default function SectionRenderer({ section }: Props) {
    let content;

    switch (section.type) {
        case "static_slider":
            content = <StaticSlider section={section} />
            break;

        case "static_carousel_news":
            content = <StaticCarousel section={section} />
            break;

        case "static_grid_news":
            content = <StaticGridNews section={section} />
            break;

        // fallback affiché si le type n'est pas reconnu
        default:
            content = <SectionFallback />
    }

    return (
        <section className="py-16">{content}</section>
    )
}

