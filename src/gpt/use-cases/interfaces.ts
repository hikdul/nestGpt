
export interface options {
    prompt: string
}

export interface optionsTranslator
{
    prompt: string
    lang: string
}

export interface optionsTextToAudio
{
    prompt: string
    voice: string
}

export interface OptionsAutoToText{
    prompt?: string
    audio: Express.Multer.File
}