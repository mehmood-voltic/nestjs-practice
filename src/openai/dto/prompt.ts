import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class PromptDto {
  @ApiProperty({ example: "prompt", description: "Prompt for openai" })
  @IsNotEmpty()
  prompt: string;
}
