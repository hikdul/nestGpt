
import { , IsString } from "class-validator";

export class textToAudioDTO {
    readonly audio: string
    
    @IsString()
    readonly prompt: string
}
