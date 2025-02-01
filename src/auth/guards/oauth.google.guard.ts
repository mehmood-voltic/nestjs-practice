import { AuthGuard } from "@nestjs/passport";

export class OAuthGoogleGuard extends AuthGuard("google") {}
