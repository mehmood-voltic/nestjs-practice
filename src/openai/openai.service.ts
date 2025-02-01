import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { OpenAI, OpenAIError } from "openai";

@Injectable()
export class OpenaiService {
  //define this private property
  private openai: OpenAI;

  constructor(private prisma: PrismaService) {
    //initalize the property in the constructor
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async getCompletion(prompt: string) {
    // try {
    const response = await this.openai.chat.completions.create({
      modalities: ["text"],
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });
    return response.choices[0].message.content;
    // } catch (error) {
    //   if (error instanceof OpenAIError) {
    //     console.log(error);
    //     throw new InternalServerErrorException(error.message);
    //   }
    // }
  }
}

//this is an alternate method of extending service class from OpenAI class
// @Injectable()
// export class OpenaiService extends OpenAI {
//   constructor(private prisma: PrismaService) {
//     super({
//       apiKey: process.env.OPENAI_API_KEY,
//     });
//   }

//   async getCompletion(prompt: string) {
//     // try {
//     const response = await this.chat.completions.create({
//       modalities: ["text"],
//       model: "gpt-4o-mini",
//       messages: [{ role: "user", content: prompt }],
//     });
//     return response.choices[0].message.content;
//     // } catch (error) {
//     //   if (error instanceof OpenAIError) {
//     //     console.log(error);
//     //     throw new InternalServerErrorException(error.message);
//     //   }
//     // }
//   }
// }
