import { UnprocessableEntityException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-google-oauth20";
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
    profile: Profile,
    done: VerifiedCallback,
  ): Promise<any> {
    console.log("Google Profile : >>>>>>>>>", profile);
    console.log("Google Access Token: ", accessToken);
    console.log("Google Refresh Token: ", refreshToken);

    if (!profile.emails || !profile.emails[0].value) {
      throw new UnprocessableEntityException("Email not found");
    }

    const profile_pic = profile.photos?.length ? profile.photos[0].value : null;
    const user = {
      id: profile.id,
      email: profile.emails[0].value,
      picture: profile_pic,
      name: profile.displayName,
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
