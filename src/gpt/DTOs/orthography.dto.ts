import { IsInt, IsOptional, IsString } from "class-validator"

export class orthographyDTO{
    
    @IsString()
    readonly prompt: string
    
    @IsInt()
    @IsOptional()
    readonly maxTokens?: number
    
}