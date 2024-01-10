import { Injectable } from '@nestjs/common';
import { getAudioToCode, orthographyCheckUseCase, prosConsDiscuserStreamUseCase, prosConsDiscuserUseCase, textToAudioUseCase, translatorUseCase } from './use-cases';
import { TranslatorDTO, orthographyDTO, prosConsDiscuserDTO, textToAudioDTO } from './DTOs';
import OpenAI from 'openai';

// ? esta es la inyeccion directa que recibe el controlador
// note: desde aca seria genial solo llamar  casos de uso
    // *  de este modo es mas simple mantener toda la informacion organisada

@Injectable()
export class GptService {
    
    private openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    })

    // *: estos metodos pueden o no ser asincronos.
        // *: el controlador no necesita llamar al await ya que igual siempre se espera retornar una promesa
    async orthographyCheck(dto: orthographyDTO){
        // ! aca se llama desde los casos de uso
        return await  orthographyCheckUseCase(this.openai, {prompt: dto.prompt}) 
    }

    // *: para obtener pros y contras para una comparacion
    async prosConsDicusser(dto: prosConsDiscuserDTO) {
        return await prosConsDiscuserUseCase(this.openai, dto);
    }
    
    // * habilita el stream
    async prosConsDicusserStream(dto: prosConsDiscuserDTO) {
        return await prosConsDiscuserStreamUseCase(this.openai, dto);
    }
    
    // * para que tradusca de un idioma a otro
    async translator(dto: TranslatorDTO)
    {
        return await translatorUseCase(this.openai, dto)
    }
    
    // * retorna el audio del texto ingresado
    async textToAudio(dto: textToAudioDTO)
    {
        const {prompt, voice} = dto
        return await textToAudioUseCase(this.openai, {prompt, voice})
    }
    // * retorna el audio que se solicite por su codigo
    async textToAudioGet(code:string)
    {
        return await getAudioToCode({code})
    }
    

}
