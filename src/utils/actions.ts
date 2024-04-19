'use server';

import OpenAI from "openai";
import { type ChatCompletionMessage } from "openai/resources/index.mjs";

export type TourType = {
    city: FormDataEntryValue;
    country: FormDataEntryValue;
}

export type TourDetailsType = {
    city: string;
    country: string;
    title: string;
    description: string;
    stops: string[];
}

export type TourResponseType = {
    tour: TourDetailsType
}

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

export const getExistingTour = async ({ city, country }: TourType) => {
    return null;
}

export const generateTourResponse = async ({ city, country }: TourType) => {
    const query = `Find a exact ${city.toString()} in this exact ${country.toString()}.
If ${city.toString()} and ${country.toString()} exist, create a list of things families can do in this ${city.toString()},${country.toString()}. 
Once you have a list, create a one-day tour. Response should be  in the following JSON format: 
{
  "tour": {
    "city": "${city.toString()}",
    "country": "${country.toString()}",
    "title": "title of the tour",
    "description": "short description of the city and tour",
    "stops": [" stop name", "stop name","stop name"]
  }
}
"stops" property should include only three stops.
If you can't find info on exact ${city.toString()}, or ${city.toString()} does not exist, or it's population is less than 1, or it is not located in the following ${country.toString()},   return { "tour": null }, with no additional characters.`;

    try {
        const response = await openAi.chat.completions.create({
            messages: [
                { role: 'system', content: 'you are a tour guide' },
                {
                    role: 'user',
                    content: query,
                },
            ],
            model: 'gpt-3.5-turbo',
            temperature: 0,
        });

        const content = response.choices[0].message.content || '';

        const tourData: TourResponseType = JSON.parse(content);

        if (!tourData.tour) {
            return null;
        }

        return { tour: tourData.tour, tokens: response.usage?.total_tokens };
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const createNewTour = async (tour: { [k: string]: FormDataEntryValue }) => {
    return null;
}