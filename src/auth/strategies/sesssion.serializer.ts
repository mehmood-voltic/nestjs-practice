import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { DoneCallback } from "passport";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private prisma: PrismaService) {
    super();
  }

  //whatever we return here will be available as payload during deserialization
  async serializeUser(user: Omit<User, "password">, done: DoneCallback) {
    done(null, user.id);
  }

  //whatever we return here will be appended to the request object
  async deserializeUser(payload: string, done: DoneCallback) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload,
      },
    });
    if (!user) {
      return done(new Error("User not found"), null);
    }

    //@ts-ignore
    delete user.password;
    done(null, user);
  }
}
