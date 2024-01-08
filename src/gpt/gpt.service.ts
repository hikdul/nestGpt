import { Injectable } from '@nestjs/common';
import { orthographyCheckUseCase } from './use-cases';
import { orthographyDTO } from './DTOs';
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
}
