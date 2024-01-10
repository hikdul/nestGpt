import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { GptService } from './gpt.service';
import { orthographyDTO, prosConsDiscuserDTO, textToAudioDTO, textToAudioGETDTO, TranslatorDTO } from './DTOs';
import type { Response } from 'express';

@Controller('gpt')
export class GptController {

  constructor(private readonly gptService: GptService) {}
  
  // * para enviar ese detalle!!
  @Post('orthography-check')
  orthographyCheck(@Body() dto: orthographyDTO){
    return this.gptService.orthographyCheck(dto) 
    //return dto
  }

  // * pros y contras discuser
  @Post('pros-cons-discuser')
  prosConsDiscuser(@Body() dto: prosConsDiscuserDTO)
  {
    return this.gptService.prosConsDicusser(dto);
  }
  
  // * para que genere todo mediante un stream
  @Post('pros-cons-discuser-stream')
  async prosConsDiscuserStream(@Body() dto: prosConsDiscuserDTO, @Res() res: Response)
  {
    const stream = await this.gptService.prosConsDicusserStream(dto);
    res.setHeader('Content-Type', 'application/json')
    res.status(HttpStatus.OK)
    
    // ahora la magia
    // ! 'for await(...)' es para indicar que el el stream
    for await(const chunk of stream)
    {
      const piece = chunk.choices[0].delta.content || ''
      // -- se observa desde la consola ya que postman no tiene buena respuesta para estos casos
      console.log(piece)
      res.write(piece)
    }
    // ! aca cierro la llamada del stream.
    res.end()
    
  }
  
 // *  traducto entre idiomas
  @Post('translate')
  translator(@Body() dto: TranslatorDTO)
  {
    return this.gptService.translator(dto);
  }
  
   // * transforma el texto a audio
  @Post('text-to-audio')
  async textToAudio(@Body() dto: textToAudioDTO, @Res() res: Response)
  {
    const fp = await this.gptService.textToAudio(dto);
    res.setHeader('Content-Type','audio/mp3')
    res.status(HttpStatus.OK)
    res.sendFile(fp)
  }
// * retorna un audio por su codigo

  @Get('text-to-audio/:code')
  async textToAudioGet(@Param('code') code:string ,@Res() res: Response)
  {
    const fp = await this.gptService.textToAudioGet(code);
    res.setHeader('Content-Type','audio/mp3')
    res.status(HttpStatus.OK)
    res.sendFile(fp)
  }
  
}
