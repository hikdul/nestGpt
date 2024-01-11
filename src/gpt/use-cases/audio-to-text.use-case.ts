
// ~ podemos saber mas sobre el elemento que estamos usando en la siguiente direccion
// note: https://platform.openai.com/docs/guides/speech-to-text/quickstart?lang=python

import OpenAI from 'openai'
import * as fs from 'fs'
import { OptionsAutoToText } from './interfaces'

export const audioToTextUseCase = async (openia: OpenAI, {prompt, audio}: OptionsAutoToText) =>
{
    const response = await openia.audio.transcriptions.create({
        // ? este es el modelo, para el momento en que se hizo el curso solo existia el 'whisper-1'
        model:'whisper-1',
        // ? simplemento ubico el archivo para decirle de donde tomar esta interacion
        file: fs.createReadStream(audio.path),
        // ? el prompt. Es opcional
            // ~ para tener los datos que se pueden enviar en el prompt visita el siguiente enlace: https://platform.openai.com/docs/guides/speech-to-text/prompting
        prompt: prompt,
        // ? lenguaje. recordar que es en base al ISO 639-1 (columna 1) 
            // ~ para mas informacion: https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes
        language: 'es',
        // ? el tipo de respuesta obtenira. en este caso se uso el vtt que es un formato de subtitulos.
        response_format: 'verbose_json' // vtt && srt es para subtitulos 
    })
    
    console.log(response)
    return response
}