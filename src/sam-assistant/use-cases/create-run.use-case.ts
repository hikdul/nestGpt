import OpenAI from "openai";

interface Options{
    threadId: string
    assistandId?: string
}

// asst_J1faYwLtMH6KW0uZXlCLMFFI ==> esta es la clave del asistentte para generar las clases para este front
export const createRunUseCase= async (openai: OpenAI, {threadId, assistandId='asst_J1faYwLtMH6KW0uZXlCLMFFI'}:Options ) =>
{
    const run = await openai.beta.threads.runs.create(threadId,{
        assistant_id: assistandId,
        //instructions:'' //==> lo que se coloque aca sobreescribe el asistente
    })
    
    //console.log(run)
    
    return run
}