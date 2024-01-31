import { Body, Controller, Post } from '@nestjs/common';
import { SamAssistantService } from './sam-assistant.service';
import { questionDTO } from './dtos';

@Controller('sam-assistant')
export class SamAssistantController {
  constructor(private readonly samAssistantService: SamAssistantService) { }

  @Post('created-thread')
  async createdThread() {
    const {id} = await this.samAssistantService.createdThread()
    return {id}
  }

  @Post('user-question')
  async userQuestion(@Body() { threadId, question }: questionDTO) {
    this.samAssistantService.createdUserQuestion({ threadId, question })
    return {
      threadId,
      question,
      api: 'user-question'
    }
  }

}
