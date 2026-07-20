import { query, mutation } from "./_generated/server";
import { v } from "convex/values";


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


export const generateUploadUrl = mutation({
    args: {},
    handler: async (ctx) => {
        return await ctx.storage.generateUploadUrl();
    },
});

export const sendVideo = mutation({
    args: {
        storageId: v.id("_storage"),
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

export const getVideos = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("videos").order("desc").collect();
    },
});

export const getVideoById = query({
    args: { id: v.string() },
    handler: async (ctx, args) => {
        const video = await ctx.db.get(args.id as any);
        if (!video) return null;

        const videoUrl = await ctx.storage.getUrl(video.storageId);
        return { ...video, videoUrl };
    },
});