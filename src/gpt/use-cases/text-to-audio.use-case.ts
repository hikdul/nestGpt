

import OpenAI from "openai"
import { optionsTextToAudio } from "./interfaces";
import { selectVoice } from "../helpers";
import * as path from "path";
import * as fs from "fs";

export const textToAudioUseCase = async (openai: OpenAI, { prompt, voice }: optionsTextToAudio) => 
{
     const selectedVoice = selectVoice(voice)

    // ! desde aca se puede generar datos o carpetas personalisadas para saber desde que usuario o fecha se genero x elemento
    const folderPath = path.resolve(__dirname, '../../../generate/audios/')
    const spechfile = path.resolve(`${folderPath}/${new Date().getTime()}.mp3`)
    fs.mkdirSync(folderPath, {recursive:true})
    
    // ** de este modo obtengo el audio en un archivo valido
    const mp3 = await openai.audio.speech.create({
        model: 'tts-1',
        voice: selectedVoice,
        input: prompt,
        response_format: 'mp3',
    })
    
    
    // ** ahora transformamos el buffer y lo guardamos en un archivo local
    // ?? de mi parte es posible que no almacene este archivo ya que literal no me interesa almacenar esta data en esta prueba 
    const buffer = Buffer.from(await mp3.arrayBuffer())
    fs.writeFileSync(spechfile, buffer)
    // -- aca retorno el archivo generado. otra opcion es usar un unico archio que se sobreescriba a cada tanto.
    return spechfile
}

export const getAudioToCode = async ({code}) =>
{

    const folderPath = path.resolve(__dirname, '../../../generate/audios/')
    const spechfile = path.resolve(`${folderPath}/${code}.mp3`)
    return spechfile
}