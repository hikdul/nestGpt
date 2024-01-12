

import OpenAI from 'openai'
import * as fs from 'fs'
import { OptionsImageGenerator } from './interfaces'
import { downloadImageAsPNG } from '../helpers'
import * as path from 'path'
import { NotFoundException } from '@nestjs/common'

export const imgGeneratorUserCase = async (openia: OpenAI, {prompt, originalImage, maskImage}: OptionsImageGenerator) =>
{
    if(!originalImage || !maskImage)
        return await createImage(openia,prompt)
    //TODO: Verificar Original image
    
}

const createImage = async(openia: OpenAI, prompt: string) =>
{
        const response = await openia.images.generate({
            prompt,
            // ~  usamos el modelo dall-e-3 por que genera imagenes mas percisas que el dall-e-2
            model: 'dall-e-3',
            // ~ n == a cantidad de imagenes; para el modelo dall-e-3 solo soporta 1 valor.
            n: 1,
            // ~ tamano de las imagenes
            size: '1024x1024',
            //~ calidad
            quality: 'standard',
            // ~ formato, por ahora usamos en url
            response_format: 'url'
        })

        // TODO: Hacer que el url sea uno valido en el sistema local
        const url = await downloadImageAsPNG(response.data[0].url)

        return {
            // ~ url creada desde este servidor 
            url,
            // ~ url de openIA.. normalmente no duran mucho tiempo los archivos en el servidor de chatGpt 
            localPath: response.data[0].url,
            // ~ path con el que chat gpt creo la imagen basado en la imagen propia.
            revsised_prompt: response.data[0].revised_prompt
        }
}

export const getImageGeneration = async ({code}) =>
{
    const filePath = path.resolve(__dirname, `../../../generate/images/${code}.png`)
    const fpexits = fs.existsSync(filePath)
    if(!fpexits)
        throw new NotFoundException('codigo no valida o el archivo ya no existe')
    return filePath
}