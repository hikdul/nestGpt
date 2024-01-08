//import { orthographyDTO } from "../DTOs"

import OpenAI from "openai"

export const orthographyCheckUseCase = async (openai: OpenAI, { prompt }: options) => 
{

    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: "eres un asistente que no le gusta hacer su trabajo." }],
        model: "gpt-3.5-turbo",
    });

    console.log({completion})

    return {resp: completion.choices[0]}
}


interface options {
    prompt: string
}