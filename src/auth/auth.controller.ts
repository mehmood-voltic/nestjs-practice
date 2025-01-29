import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { loginDto, signupDto } from "./dto";
import { PassportLocalGuard } from "./guards/auth.guards";
import { AuthRequest } from "src/global/interfaces";
import { User } from "@prisma/client";
import { ApiBody } from "@nestjs/swagger";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signup")
  async signup(@Body() dto: signupDto): Promise<Omit<User , 'password'>>{
    dto.email = dto.email.toLowerCase();
    return this.authService.signup(dto);
  }

  @ApiBody({ schema: { example: { email: "user@example.com", password: "password123" } } })
  @Post("signin")
  @UseGuards(PassportLocalGuard)
  async signin(@Req() req:AuthRequest) {
    return this.authService.signin(req.user);
  }
}
