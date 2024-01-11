import OpenAI from "openai";
import { options } from "./interfaces";

// note: aca ira el caso en que espero es stream
export const prosConsDiscuserStreamUseCase = async (openai: OpenAI, { prompt }: options) => 
{
    return await openai.chat.completions.create({
        // ! solo con esta opcion se activa el stream 
        stream: true,
        messages: [
            { role: "system",
              content: `
                    Se te dará una pregunta con una opcion,
                    primero debes indicar que es lo bueno,
                    indica al menos tres pros,
                    luego indica por que es una mala opcion,
                    indica al menos tres contras,
                    la respuesta debe de ser en formato markdown,
                    las pros y contras deben de estar en una lista.`
            },
            { role: 'user',
              content: prompt
            }
        ],
        model: "gpt-3.5-turbo",
        temperature: 0.8,
        max_tokens: 500,
    });
}