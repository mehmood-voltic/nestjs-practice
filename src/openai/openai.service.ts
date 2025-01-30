import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { OpenAI } from "openai";

@Injectable()
export class OpenaiService extends OpenAI {
  constructor(private prisma: PrismaService) {
    super({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async getCompletion(prompt: string) {
    const response = await this.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    return response.choices[0].message.content;
  }
}
