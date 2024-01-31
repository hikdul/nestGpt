import OpenAI from "openai";

interface Options{
    threadId: string
}

export const getMessageListUseCase = async (openai: OpenAI, {threadId}: Options) => 
{
    const msgListRequest = await openai.beta.threads.messages.list(threadId)
    
    const messegeList = msgListRequest.data.map(msg =>({
        role: msg.role,
        content: msg.content.map(cnt => (cnt as any).text.value)
    }))
    
    return messegeList

}