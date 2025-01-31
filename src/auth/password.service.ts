import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcryptjs";

@Injectable()
export class PasswordService {
  async hashPassword(password: string): Promise<string> {
    const saltOrRounds = parseInt(process.env.SALT_ROUNDS || "10");
    return await bcrypt.hash(password, saltOrRounds);
  }

  async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
