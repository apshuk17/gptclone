'use server';

import prisma from "@/db"
import { revalidatePath } from "next/cache";

export const fetchUserTokensById = async (clerkId: string) => {
    const result = await prisma.token.findUnique({
        where: {
            clerkId
        }
    })
    return result?.tokens;
}

export const generateUserTokensForId = async (clerkId: string) => {
    const result = await prisma.token.create({
        data: {
            clerkId
        }
    })

    return result?.tokens;
}

export const fetchOrGenerateTokens = async (clerkId: string) => {
    const result = await fetchUserTokensById(clerkId);

    if (result) return result

    const tokens = await generateUserTokensForId(clerkId);
    return tokens;
}

export const subtractTokens = async (clerkId: string, tokens: number) => {
    const result = await prisma.token.update({
        where: {
            clerkId
        }, data: {
            tokens: {
                decrement: tokens
            }
        }
    });

    revalidatePath('/profile');

    return result.tokens;
}