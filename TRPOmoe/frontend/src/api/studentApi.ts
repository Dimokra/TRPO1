export async function apiGet(url: string) {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Ошибка загрузки данных");
    return response.json();
}

export async function apiPost(url: string, body: any) {
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    const text = await response.text();
    return text ? JSON.parse(text) : null;
}
