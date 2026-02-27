const API_URL = import.meta.env.VITE_ENDPOINT_URL;
const ACCOUNT_KEY = import.meta.env.VITE_X_ACCOUNT_KEY;

if (!API_URL || !ACCOUNT_KEY) {
    throw new Error("Pas de configuration d'API dans le fichier .env")
}


export async function apiFetch<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            ...options.headers,
            "x-account-key": ACCOUNT_KEY,
            ...options.headers,
        },
    });

    if (!response.ok) {
        throw new Error(`Erreur API: ${response.status}`);
    }

    return response.json();
}

