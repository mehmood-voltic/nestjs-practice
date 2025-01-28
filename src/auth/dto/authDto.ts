import { UserRoles } from "@prisma/client";
import {
  IsEmail,
  MinLength,
  IsEnum,
  IsString,
  IsOptional,
} from "class-validator";

export class signupDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @MinLength(6)
  password: string;

  @IsEnum(UserRoles, {
    message: "role must be admin, customer or agent",
  })
  @IsOptional()
  role: UserRoles;
}

export class loginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
