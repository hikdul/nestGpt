import OpenAI from "openai";
import { options } from "./interfaces";

export const prosConsDiscuserUseCase = async (openai: OpenAI, { prompt }: options) => 
{

    const completion = await openai.chat.completions.create({
        messages: [
            { role: "system",
              content: `
                    Se te dará una pregunta con dos opciones,
                    primero debes indicar cual es la mejor opcion,
                    tu tarea principal es dar una respuesta con un pro y un contra de cada opcion,
                    por cada opcion debe de tener solo un pro y un contra,
                    al final indicar por que la opcion que se considero mejor gana la contienda,
                    la respuesta debe de ser en formato markdown,
                    los pros y contras deben de estar en una lista.`
            },
            { role: 'user',
              content: prompt
            }
        ],
        model: "gpt-3.5-turbo",
        temperature: 0.8,
        max_tokens: 500,
    });

  //  console.log({completion})
    
    return completion.choices[0].message
}