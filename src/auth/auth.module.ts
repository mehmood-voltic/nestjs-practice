import { Module } from "@nestjs/common";
import { AuthService } from "./services/auth.service";
import { AuthController } from "./controllers/auth.controller";
import { UsersModule } from "src/users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { PasswordService } from "./password.service";
import { OauthGoogleController } from "./controllers/oauth-google.controller";
import { GoogleStrategy } from "./strategies/google.strategy";
import { SessionSerializer } from "./strategies/sesssion.serializer";
import { SessionProvider } from "./services/session.provider.service";

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET as string,
      global: true,
      signOptions: { expiresIn: "1d" },
    }),

    //if we use jwt stateless authentication, then this would've been kept empty, but in session auth case, we have to add the sesion true option to enable passport to pick seesion from express sesssion
    PassportModule.register({
      session: true,
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    PasswordService,
    GoogleStrategy,
    SessionSerializer,
    SessionProvider,
  ],
  controllers: [AuthController, OauthGoogleController],
  exports: [AuthService],
})
export class AuthModule {}
