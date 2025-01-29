import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "./types";
import { PrismaService } from "src/prisma/prisma.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt'){
    constructor(private prisma: PrismaService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET as string,
            ignoreExpiration:false,
        })
    }

    async validate(payload: JwtPayload){
        console.log("Token Payload: ", payload.sub)
        //the return type is appended to the request object
        // return {
        //     userId: payload.sub,
        //     email: payload.email
        // }

        //if we want to return the user object, we have to query databse to get the user
        const user = await this.prisma.user.findUnique({where:{id: String(payload.sub)}})
        if(!user){
            throw new UnauthorizedException('Invalid token payload')
        }

        console.log("User: ", user)

        return user
    }
}