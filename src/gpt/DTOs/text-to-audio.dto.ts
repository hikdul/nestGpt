
import { IsOptional, IsString } from "class-validator";

export class textToAudioDTO {
    @IsString()
    readonly prompt: string
    
    @IsString()
    @IsOptional()
    readonly voice: string
}
