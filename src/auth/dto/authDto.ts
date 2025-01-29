import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { UserRoles } from "@prisma/client";
import {
  IsEmail,
  MinLength,
  IsEnum,
  IsString,
  IsOptional,
} from "class-validator";


export class signupDto {
  @ApiProperty({ example: "user@example.com", description: "User's email address" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "John Doe", description: "Full name of the user" })
  @IsString()
  name: string;

  @ApiProperty({ example: "password123", description: "User's password", minLength: 6 })
  @MinLength(6)
  password: string;

  @ApiPropertyOptional({
    example: UserRoles.customer,
    description: "User role (admin, customer, or agent)",
    enum: UserRoles,
  })
  @IsEnum(UserRoles, { message: "Role must be admin, customer, or agent" })
  @IsOptional()
  role: UserRoles;
}


export class loginDto {
  @ApiProperty({example: 'user@example.com'})
  @IsEmail()
  email: string;

  @ApiProperty({title: 'Password', example: 'password123'})
  @IsString()
  password: string;
}
