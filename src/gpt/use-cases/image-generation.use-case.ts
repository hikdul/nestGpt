import OpenAI from 'openai'
import * as fs from 'fs'
import { OptionsImageGenerator } from './interfaces'
import { downloadBase64ImageAsPng, downloadImageAsPNG, imageResponse } from '../helpers'
import * as path from 'path'
import { NotFoundException } from '@nestjs/common'
import { ImagesResponse } from 'openai/resources'


// * ====================================/
//* obtiene una imagen previamente creada 
export const getImageGeneration = async ({code}) =>
{
    const filePath = path.resolve(__dirname, `../../../generate/images/${code}.png`)
    const fpexits = fs.existsSync(filePath)
    if(!fpexits)
        throw new NotFoundException('codigo no valida o el archivo ya no existe')
    return filePath
}

// * ====================================/
// * caso de uso que edita/crea imagenes  

export const imgGeneratorUserCase = async (openia: OpenAI, {prompt, originalImage, maskImage}: OptionsImageGenerator)
: Promise<imageResponse> =>
{
    if(!originalImage || !maskImage)
        return await CrearRespuestaDeImagen( await createImage(openia,prompt))
    const pngImagePath = await downloadImageAsPNG(originalImage)// ? la idea es que originalImage sea del estilo: http://localhost:3000/... 
    const maskPath = await downloadBase64ImageAsPng(maskImage) // ?  base64?=...
    return await CrearRespuestaDeImagen(await modificarImage(openia, prompt, pngImagePath, maskPath))
    
}

// * ================================================================/
// * este modifica en base a una peticion y el envio de dos imagenes  
const modificarImage = async (openia, prompt, pngImagePath, maskPath)  
:Promise<OpenAI.Images.ImagesResponse> => 
{
    return await await openia.images.edit({
        model: 'dall-e-2',
        prompt,
        image: fs.createReadStream(pngImagePath),
        mask: fs.createReadStream(maskPath),
        n: 1,
        size: '1024x1024',
        response_format: 'url'
    })

}


// * ======================/ 
// * este crea las imagenes  
const createImage = async(openia: OpenAI, prompt: string)
:Promise<OpenAI.Images.ImagesResponse> => 
{
        return await openia.images.generate({
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

}

// * ================================================================================/
// * crea la respuesta del caso de uso que se repite con la generacion de cada imagen 
const CrearRespuestaDeImagen = async (response: OpenAI.Images.ImagesResponse) =>
{

        const fileName = await downloadImageAsPNG(response.data[0].url)
        var div = fileName.split('.')
        
        const url = `${process.env.SERVER_FRONEND_URL}/gpt/image-generation/${div[0]}`

        return {
            // ~ url creada desde este servidor 
            url,
            // ~ url de openIA.. normalmente no duran mucho tiempo los archivos en el servidor de chatGpt 
            localPath: response.data[0].url,
            // ~ path con el que chat gpt creo la imagen basado en la imagen propia.
            revsised_prompt: response.data[0].revised_prompt
        }
}
