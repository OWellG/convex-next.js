import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// --- TWOJE DOTYCHCZASOWE KOMENTARZE (Zostają bez zmian) ---

export const sendMessage = mutation({
    args: { user: v.string(), body: v.string() },
    handler: async (ctx, args) => {
        await ctx.db.insert("messages", { user: args.user, body: args.body });
    },
});

export const getMessages = query({
    args: {},
    handler: async (ctx) => {
        const messages = await ctx.db.query("messages").order("desc").take(50);
        return messages.reverse();
    },
});


// --- NOWA LOGIKA WIDEO (Dopisujemy poniżej) ---

// 1. Pobranie adresu do bezpośredniego wrzucenia pliku (Krok 1 z dokumentacji)
export const generateUploadUrl = mutation({
    args: {},
    handler: async (ctx) => {
        return await ctx.storage.generateUploadUrl();
    },
});

// 2. Zapisanie danych filmu do nowej tabeli "videos" po udanym uploadzie (Krok 3 z dokumentacji)
export const sendVideo = mutation({
    args: {
        storageId: v.id("_storage"), // Bezpieczny typ systemowy Convex dla plików
        author: v.string(),
        title: v.string(),
        description: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("videos", {
            storageId: args.storageId,
            author: args.author,
            title: args.title,
            description: args.description,
            createdAt: Date.now(),
        });
    },
});

// 3. Pobieranie wszystkich filmów na stronę główną
export const getVideos = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("videos").order("desc").collect();
    },
});

// 4. Pobieranie jednego konkretnego filmu i wygenerowanie linku do odtwarzacza
export const getVideoById = query({
    args: { id: v.string() }, // Przetwarzamy ID jako string z adresu URL
    handler: async (ctx, args) => {
        // Szukamy filmu w bazie po jego ID stringu
        const video = await ctx.db.get(args.id as any);
        if (!video) return null;

        // Generujemy bezpośredni link URL do pliku wideo w chmurze Convex
        const videoUrl = await ctx.storage.getUrl(video.storageId);
        return { ...video, videoUrl };
    },
});