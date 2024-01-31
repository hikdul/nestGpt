import OpenAI from 'openai';
import { Injectable } from '@nestjs/common';
import { createMessageUseCase, createdThreadUseCase } from './use-cases';
import { questionDTO } from './dtos';

@Injectable()
export class SamAssistantService {
    
    private openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    })
    
    
    async createdThread(){
        return await createdThreadUseCase(this.openai)
    }
    
    async createdUserQuestion({threadId,question}:questionDTO)
    {
        const message = await createMessageUseCase(this.openai, {threadId , question})
        console.log({message})
    }
    
}

