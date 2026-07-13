import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { Migrations } from "@convex-dev/migrations";
import { DataModel } from "./_generated/dataModel.js";
import { components } from "./_generated/api.js";
export const migrations = new Migrations<DataModel>(components.migrations);
export const sendMessage = mutation({
    args: {
        user: v.string(),
        body: v.string(),
    },
    handler: async (ctx, args) => {
        console.log("This TypeScript function is running on the server.");
        await ctx.db.insert("messages", {
            user: args.user,
            body: args.body,
        });

    },
});

export const getMessages = query({
    args: {},
    handler: async (ctx) => {
        // Get most recent messages first
        const messages = await ctx.db.query("messages").order("desc").take(50);
        // Reverse the list so that it's in a chronological order.
        return messages.reverse();
    },
});

export const setDefaultUsernamefix = migrations.define({
    table: "messages",
    migrateOne: async (ctx, user) => {
        if (user.user === "Autor") {
            await ctx.db.patch(user._id, { user: "Anonymous" });
        }
    },
});
