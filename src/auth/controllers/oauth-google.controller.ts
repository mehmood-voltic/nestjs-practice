import {
  Controller,
  Get,
  NotImplementedException,
  Req,
  UseGuards,
} from "@nestjs/common";
import { OAuthGoogleGuard } from "src/auth/guards/oauth.google.guard";
import { PrismaService } from "src/prisma/prisma.service";

@Controller("oauth-google")
export class OauthGoogleController {
  constructor(private prisma: PrismaService) {}

  @Get("login")
  @UseGuards(OAuthGoogleGuard)
  async login(@Req() req: any) {
    return req.user ?? "nothing found";
  }

  @Get("callback")
  @UseGuards(OAuthGoogleGuard)
  async callback() {
    return "You are now authenticated with your google account";
  }
}
