import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthService } from "./auth.service";
import { loginDto, signupDto } from "./dto";
import { PassportLocalGuard } from "./guards/auth.guards";
import { PassportJwtGuard } from "./guards/jwt.guards";
import { AuthRequest } from "src/global/interfaces";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signup")
  async signup(@Body() dto: signupDto): Promise<any> {
    dto.email = dto.email.toLowerCase();
    return await this.authService.signup(dto);
  }

  @Post("signin")
  @UseGuards(PassportLocalGuard)
  async signin(@Req() req:AuthRequest) {
    return await this.authService.signin(req.user);
  }
}
