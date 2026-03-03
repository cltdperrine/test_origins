import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { apiFetch } from "../services/api";
import placeholder from "../assets/placeholder.png"
import type { Video } from "../types/content";


export default function VideoDetail() {
    const { slug } = useParams<{ slug: string }>();

    const [video, setVideo] = useState<Video | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!slug) return;

        async function fetchVideo() {
            try {
                const data = await apiFetch<Video>(`/videos?id=${slug}&language=fr`);
                setVideo(data);
            } catch (error) {
                console.error(error);
                setError("Erreur lors du chargement de la vidéo")
            } finally {
                setLoading(false);
            }
        }

        fetchVideo();
    }, [slug])

    if (loading) {
        return <div className="p-10">Chargement...</div>;
    }

    if (error) {
        return <div className="p-10 text-red-600">{error}</div>
    }

    if (!video) {
        return <div className="p-10">Vidéo introuvable</div>
    }

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold mb-6">{video.title}</h1>

            <div className="mb-8">
                {video.url ? (
                    <video
                        controls
                        className="w-full aspect-[16/9] rounded-xl"
                    >
                        <source src={video.url} type="video/mp4" />
                        Votre navigateur ne supporte pas la lecture vidéo.
                    </video>
                ) : (
                    <img
                        src={video.image?.url ?? placeholder}
                        alt={video.title}
                        className="w-full aspect-[16/9] object-cover rounded-xl"
                    />
                )}
            </div>

            {video.categories && (
                <div className="flex flex-wrap gap-2 mb-6">
                    {video.categories.map((cat) => (
                        <span
                            key={cat.codename}
                            className="px-3 py-1 text-sm bg-gray-100 rounded-full">{cat.name}</span>
                    ))}
                </div>

            )}
        </div>
    )


}

