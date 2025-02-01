import {
  Injectable,
  NotImplementedException,
  UnauthorizedException,
} from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { User } from "@prisma/client";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: "email",
      passwordField: "password",
    });
  }

  //this default validate funciton is abstraction inside Passport Strategy class. If we return user, it appends the user to the request object automatically
  async validate(email: string, password: string): Promise<User> {
    return this.authService.validateUser({ email, password });
  }
}
