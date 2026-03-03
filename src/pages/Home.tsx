import { useEffect, useState } from "react";
import { apiFetch } from "../services/api";
import SectionRenderer from "../components/sections/SectionRenderer";
import type { Section } from "../types/content"
import "../index.css"

interface PageResponse {
    sections: Section[];
}

export default function Home() {
    const [sections, setSections] = useState<Section[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchHome() {
            try {
                const data = await apiFetch<PageResponse>(`/pages?slug=tech-test&language=fr`
                )
                setSections(data.sections)
            } catch (error) {
                console.error(error);
                setError("Erreur lors du chargement de la page")
            } finally {
                setLoading(false)
            }
        }

        fetchHome();
    }, []);

    if (loading) return <p>Chargement...</p>
    if (error) return <p>{error}</p>

    return (
        <div className="w-full">
            {sections.map((section) => (
                <SectionRenderer key={section.id} section={section} />
            ))}
        </div>
    )

}
