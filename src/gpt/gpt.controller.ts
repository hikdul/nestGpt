import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { GptService } from './gpt.service';
import { orthographyDTO, prosConsDiscuserDTO } from './DTOs';
import { Response } from 'express';

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
  
}
