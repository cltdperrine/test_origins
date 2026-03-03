import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "../services/api";
import type { Article } from "../types/content";

export default function Articles() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)



  useEffect(() => {
    async function fetchArticles() {
      try {
        const data = await apiFetch<Article[]>(
          "/articles?language=fr"
        )
        setArticles(data)
      } catch (error) {
        console.error(error);
        setError("Erreur lors du chargement des articles")
      } finally {
        setLoading(false)
      }

      const data = await apiFetch("/articles?language=fr");
      console.log("ARTICLES DATA:", data);
    }

    fetchArticles()
  }, [])

  if (loading) return <div className="p-10">Chargement...</div>

  if (error) return <div className="p-10 text-red-600">{error}</div>

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Articles</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <Link
            key={article.id}
            to={`/articles/${article.id}`}
            className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden"
          >
            <img
              src={article.image?.url ?? "https://placehold.co/600x400"}
              alt={article.title}
              className="w-full h-48 object-cover" />

            <div className="p-4">
              <h2 className="font-semibold text-lg line-clamp-2">{article.title}</h2>

              {article.publication_date && (
                <p className="text-sm text-gray-500 mt-2">
                  {new Date(
                    article.publication_date
                  ).toLocaleDateString("fr-FR")}
                </p>
              )}

            </div>

          </Link>
        ))}

      </div>
    </div>
  )
}