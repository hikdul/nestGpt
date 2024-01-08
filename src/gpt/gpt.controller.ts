import { Body, Controller, Post } from '@nestjs/common';
import { GptService } from './gpt.service';
import { orthographyDTO } from './DTOs';

@Controller('gpt')
export class GptController {

  constructor(private readonly gptService: GptService) {}
  
  // * para enviar ese detalle!!
  @Post('orthography-check')
  orthographyCheck(@Body() dto: orthographyDTO){
    return this.gptService.orthographyCheck(dto) 
    //return dto
  }
  
}
