import OpenAI from 'openai';
import { Injectable } from '@nestjs/common';
import { checkCompleteStatusUseCase, createMessageUseCase, createRunUseCase, createdThreadUseCase, getMessageListUseCase } from './use-cases';
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
        await createMessageUseCase(this.openai, {threadId , question})
        //console.log({message})
        const run = await createRunUseCase(this.openai,{threadId})
        await checkCompleteStatusUseCase(this.openai,{runId: run.id, threadId})
        const msgs = await getMessageListUseCase(this.openai, {threadId})
        return msgs.reverse()
    }
    
}

