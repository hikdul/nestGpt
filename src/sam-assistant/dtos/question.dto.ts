import { IsString, isString } from "class-validator";

export class questionDTO{
    @IsString()
    readonly threadId: string
    
    @IsString()
    readonly question: string
}