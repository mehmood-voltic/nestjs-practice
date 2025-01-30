import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { OpenaiService } from "./openai.service";
import { PromptDto } from "./dto";

@Controller("openai")
export class OpenaiController {
  constructor(private openAiService: OpenaiService) {}

  @Post("completion")
  async getCompletion(@Body() { prompt }: PromptDto): Promise<any> {
    return await this.openAiService.getCompletion(prompt);
  }
}
