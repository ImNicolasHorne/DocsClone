import { ConvexError, v } from "convex/values"
import { paginationOptsValidator } from "convex/server";

import { mutation, query } from "./_generated/server";

export const create = mutation({
    args: { title: v.optional(v.string()), initialContent: v.optional(v.string())  },
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity();

        if (!user) {
            throw new ConvexError("Unauthorized");
        }

        const organizationId = (user.organization_id ?? undefined) as
        | string
        |undefined


        return await ctx.db.insert("documents", {
            title: args.title ?? "Untitled document",
            ownerId: user.subject,
            organizationId,
            initalContent: args.initialContent,
        });
    },
});

export const get = query({
    args: {paginationOpts: paginationOptsValidator, search: v.optional(v.string()) },
    handler: async (ctx, { search, paginationOpts}) => {
        const user = await ctx.auth.getUserIdentity();

        if (!user) {
            throw new ConvexError("Unauthorized");
        }

        const organizationId = (user.organization_id ?? undefined) as
            | string
            |undefined

        if (search && organizationId) { //search within organization
            return await ctx.db
                .query("documents")
                .withSearchIndex("search_title", (q) =>
                q.search("title", search).eq("organizationId", organizationId)
                )
                .paginate(paginationOpts)
        } 
        
        if (search) { //personal search
            return await ctx.db
                .query("documents")
                .withSearchIndex("search_title", (q) => 
                    q.search("title", search).eq("ownerId", user.subject))
                .paginate(paginationOpts)
        }

        if (organizationId) { //all doc inside organization
            return await ctx.db
                .query("documents")
                .withIndex("by_organizationId", (q) => q.eq("organizationId", organizationId))
                .paginate(paginationOpts);
        }

        return await ctx.db //qll personal docs
            .query("documents")
            .withIndex("by_owner_id", (q) => q.eq("ownerId", user.subject))
            .paginate(paginationOpts);
    },
});


export const removeById = mutation({
    args: { id: v.id("documents")},
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity();

        if (!user) {
            throw new ConvexError("Unauthorized")
        }

        const organizationId = (user.organization_id ?? undefined) as
        | string
        |undefined


        const document = await ctx.db.get(args.id);

        if (!document) {
            throw new ConvexError("Document not found");
        }

        const isOwner = document.ownerId === user.subject;
        const isOrganizationMember = document.organizationId === organizationId;

        if (!isOwner && isOrganizationMember) {
            throw new ConvexError("Unauthorized");
        }

        return await ctx.db.delete(args.id)
    },
});

export const updateById = mutation({
    args: { id: v.id("documents"), title: v.string()},
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity();

        if (!user) {
            throw new ConvexError("Unauthorized")
        }

        const organizationId = (user.organization_id ?? undefined) as
        | string
        |undefined

        const document = await ctx.db.get(args.id);

        if (!document) {
            throw new ConvexError("Document not found");
        }

        const isOwner = document.ownerId === user.subject;
        const isOrganizationMember = document.organizationId === organizationId;

        if (!isOwner && isOrganizationMember) {
            throw new ConvexError("Unauthorized");
        }

        return await ctx.db.patch(args.id, { title: args.title })
    },
});