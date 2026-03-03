import type { Section } from "../../types/content";
import SectionFallback from "./SectionFallback";
import StaticGridNews from "./StaticGridNews";
import StaticSlider from "./StaticSlider";
import StaticCarousel from "./StaticCarouselNews";


interface Props {
    section: Section;
}

export default function SectionRenderer({ section }: Props) {
    switch (section.type) {
        case "static_slider":
            return <StaticSlider section={section} />

        case "static_carousel_news":
            return <StaticCarousel section={section} />

        case "static_grid_news":
            return <StaticGridNews section={section} />


        default:
            return <SectionFallback />
    }
}

