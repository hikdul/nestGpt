
import OpenAI from "openai"
import { optionsTranslator } from "./interfaces";

export const translatorUseCase = async (openai: OpenAI, { prompt, lang }: optionsTranslator) => 
{

    const completion = await openai.chat.completions.create({
        messages: [
            { role: "system", content: `Traduce el siguiente texto al idioma ${lang}:${ prompt }` },
        ],
        // ? el modelo que se va usar
        model: "gpt-3.5-turbo",
        // ? temperatura: mientras el valor sea mas lejano a cero; puede indicar que el valor tenga respuestas mas aleatorias
        temperature: 0.3,
        // ? parte del consumo de las cuotas
        max_tokens: 100,
        // ? para indicar el formato de respuesta. nota: no es compatible con gpt-4       
        //response_format:{
        //    type: 'json_object'
        //}
        // TODO: buscar que tanto se puede usar y con que modelos son compatibles.

    }
    );

    //console.log({completion})
    //console.log(completion.choices[0].message.content)
    
    return {message: completion.choices[0].message.content}
}

