import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { apiFetch } from "../services/api";

interface Video {
    title: string;
    poster?: string;
    videoUrl?: string;
    categories?: { name: string }[];
}


export default function VideoDetail() {
    const { slug } = useParams();

    const [video, setVideo] = useState<Video | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


useEffect(() => {
    if (!slug) return;

    async function fetchVideo() {
        try {
            const data = await apiFetch<Video>(`/videos?slug=${slug}&language=fr`);
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
    return <p>Chargement en cours</p>;
}

if (error) {
    return <p>{error}</p>
}

if (!video) {
    return <p>Vidéo introuvable</p>
}

return (
    <div>
        <h1>{video.title}</h1>

        {video.videoUrl ? (
            <video controls poster={video.poster} width="100%">
                <source src={video.videoUrl} />
            </video>

        ) : (
            <img
            src={video.poster || "https://placehold.co/600x400"}
            alt={video.title} />
        )}

        {video.categories && (
            <ul>
                {video.categories.map((category) => (
                    <li key={category.name}>{category.name}</li>
                ))}
            </ul>
        )}
    </div>
)}