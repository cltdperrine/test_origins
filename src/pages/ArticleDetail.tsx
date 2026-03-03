import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiFetch } from "../services/api";
import placeholder from "../assets/placeholder.png"

interface Category {
    name: string;
    codename: string;
}

interface Article {
    title: string;
    body?: string;
    images?: {
        main?: {
            url: string;
        }
    }
    categories?: Category[];
}


export default function ArticleDetail() {
    const { slug } = useParams<{ slug: string }>();

    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

useEffect(() => {
  if (!slug) return;

  async function fetchArticle() {
    try {
      const data = await apiFetch<Article>(
        `/articles?id=${slug}&language=fr`
      );
      setArticle(data);
    } catch (err) {
      console.error(err);
      setError("Erreur lors du chargement de l'article");
    } finally {
      setLoading(false);
    }
  }

  fetchArticle();
}, [slug]);

    if (loading)
        return <div className="p-10">Chargement...</div>

    if (error)
        return <div className="p-10 text-red-600">{error}</div>

    if (!article)
        return <div className="p-10">Article introuvable</div>

    return (

        <div className="max-w-4xl mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold mb-8">{article.title}</h1>

            <div className="mb-8">
                <img
                    src={article.images?.main?.url ?? placeholder}
                    alt={article.title}
                    className="w-full aspect-[16/9] object-cover rounded-xl"
                />
            </div>

            {article.categories && (
                <div className="flex flex-wrap gap-2 mb-6">
                    {article.categories.map((cat) => (
                        <span
                            key={cat.codename}
                            className="px-3 py-1 text-sm bg-gray-100 rounded-full">
                            {cat.name}
                        </span>
                    ))}

                </div>
            )}

            {article.body && (
                <div className="my-4 text-lg text-body"
                    dangerouslySetInnerHTML={{ __html: article.body}} />
)}

        </div>
    )
}
