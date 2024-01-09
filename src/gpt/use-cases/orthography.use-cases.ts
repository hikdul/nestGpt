//import { orthographyDTO } from "../DTOs"

import OpenAI from "openai"

export const orthographyCheckUseCase = async (openai: OpenAI, { prompt }: options) => 
{

    const completion = await openai.chat.completions.create({
        messages: [
            { role: "system", content: `
                te seran proveidos textos en español con posibles errores ortograficos y gramaticales,
                las palabras usadas deben de existir en el diccionario de la RAE(Real Academia española),
                debes de responder en formato JSON,
                tu torea es correguir estos errores ortograficos y retornar informacion de las soluciones,
                tambien debes de dar un porcentaje de acierto,
                
                si no existen errores entonces retorna un mensaje de felicitaciones.
                
                ejemplo de salida:
                {
                    userScore: number,
                    errors: string[], // ['error -> solucion']
                    message: string, // usa emojis y textos para felicitar al usuario si se diera el caso
                }
            ` },
            { role: 'user', content: prompt}
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
    const resp = JSON.parse(completion.choices[0].message.content)
    
    return resp
}


interface options {
    prompt: string
}