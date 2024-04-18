'use server';

import OpenAI from "openai";
import { type ChatCompletionMessage, type ChatCompletionRole } from "openai/resources/index.mjs";

const openAi = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

export const generateChatResponse = async (chatMessages: ChatCompletionMessage[]) => {
    try {
        const response = await openAi.chat.completions.create({
            messages: [
                { role: 'system', content: 'You\'re a helpful assistant' },
                ...chatMessages
            ],
            model: 'gpt-3.5-turbo',
            temperature: 0
        })

        return response.choices[0].message;
    } catch (error) {
        return null;
    }

}