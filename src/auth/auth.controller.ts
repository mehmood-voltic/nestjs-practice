import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthService } from "./auth.service";
import { loginDto, signupDto } from "./dto";
import { AuthGuard } from "./guards/auth.guards";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signup")
  async signup(@Body() dto: signupDto): Promise<any> {
    dto.email = dto.email.toLowerCase();
    return await this.authService.signup(dto);
  }

  @Post("signin")
  async signin(@Body() data: loginDto) {
    data.email = data.email.toLowerCase();
    return await this.authService.authenticateUser(data);
  }
  
  // @UseGuards(AuthGuard)
  // @Get('posts')
  // async getPosts() {
  //   return await this.prisma.post.findMany();
  // }
}
