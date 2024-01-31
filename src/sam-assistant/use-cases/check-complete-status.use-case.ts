import OpenAI from "openai";
import { resolve } from "path";

interface Options{
    threadId: string
    runId: string

}

export const checkCompleteStatusUseCase = async (openai: OpenAI, { threadId,runId } : Options) =>
{
    const runStatus = await openai.beta.threads.runs.retrieve(threadId, runId)
    
    console.log({status :runStatus.status})// esperando ==> completed
    if(runStatus.status === 'completed')
        return runStatus
    
    // tiempo de espera para que no sobrecarge... por ahora esperamos 1sg
    await new Promise(resolve => setTimeout(resolve, 1000))

    return await checkCompleteStatusUseCase(openai, {threadId, runId})
        
}