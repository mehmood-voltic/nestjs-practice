import { Controller, HttpCode, NotImplementedException, Post } from "@nestjs/common"
import { AuthService } from "./auth.service";

@Controller('auth')
export class PassportAuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(200)
    @Post('login')
    login() {
        throw new NotImplementedException('Not implemented')
    }
    
}