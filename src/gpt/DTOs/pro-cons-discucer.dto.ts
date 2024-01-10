import { IsString } from "class-validator";

export class prosConsDiscuserDTO {
    @IsString()
    readonly prompt: string
}