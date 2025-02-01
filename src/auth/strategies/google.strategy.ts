import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";
import { VerifiedCallback } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";

export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(private prisma: PrismaService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      //   authorizationURL: process.env.GOOGLE_AUTHORIZATION_URL as string,
      callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
      scope: ["profile", "email"],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifiedCallback,
  ): Promise<any> {
    console.log("Google Profile : >>>>>>>>>", profile);
    console.log("Google Access Token: ", accessToken);
    console.log("Google Refresh Token: ", refreshToken);
    const {
      emails,
      id,
      displayName,
      name: { givenName, familyName },
      photos,
    } = profile;

    const user = {
      id,
      email: emails[0].value,
      firstName: givenName,
      lastName: familyName,
      picture: photos[0].value,
      name: displayName,
    };

    //we can save this user to our database
    try {
      const isUserExist = await this.prisma.user.findUnique({
        where: { email: user.email },
      });
    } catch (error) {}

    done(null, profile);
  }
}
