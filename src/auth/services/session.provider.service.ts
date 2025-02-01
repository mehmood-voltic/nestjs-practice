import { Injectable, Inject } from "@nestjs/common";
import * as session from "express-session";
import { RedisStore } from "connect-redis";
import { Redis } from "ioredis";
import { InjectRedis } from "@nestjs-modules/ioredis";

@Injectable()
export class SessionProvider {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  getSessionMiddleware() {
    return session({
      store: new RedisStore({
        client: this.redis,
        // scanCount: 100,
        prefix: "session:",
      }),
      resave: false,
      secret: process.env.SESSION_SECRET as string,
      saveUninitialized: false,
      rolling: true,
      cookie: {
        httpOnly: true,
        secure: false, // Set true if using HTTPS
        maxAge: 1000 * 60 * 60, // 1 hour session
      },
    });
  }
}
