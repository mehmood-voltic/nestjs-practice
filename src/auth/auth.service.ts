import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { loginDto, signupDto } from "./dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { UsersService } from "src/users/users.service";
import { User } from "@prisma/client";
import { JwtService } from "@nestjs/jwt";
import { PasswordService } from "./password.service";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
    private jwtService: JwtService,
    private passwordService: PasswordService,
  ) {}

  async validateUser(dto: loginDto): Promise<User> {
    const user = await this.usersService.findUserByEmail(dto.email);

    //check if the user exists
    if (!user) throw new BadRequestException("User does not exist");

    //validate password
    const isValidPassword = await this.passwordService.validatePassword(
      dto.password,
      user.password,
    );

    //check whether the password is valid
    if (!isValidPassword) throw new BadRequestException("Invalid password");

    //user is successsfully validated, now return it
    return user;
  }

  async signin(user: User): Promise<string> {
    const tokenPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const token = await this.jwtService.signAsync(tokenPayload);
    return token;
  }

  // async authenticateUser(dto: loginDto):Promise<any> {
  //   const user = await this.validateUser(dto);

  //   if (!user) {
  //     throw new BadRequestException("Invalid login credentials");
  //   }

  //   const accessToken = await this.signin(user);

  //   console.log('AccessToken: ', accessToken);
  //   console.log('User: ', user);

  //   //@ts-ignore
  //   delete user.password

  //   return {
  //     user,
  //     accessToken,
  //   };
  // }

  async signup(dto: signupDto): Promise<Omit<User, "password">> {
    console.log(dto);
    try {
      //generate password hash
      const hashedPassword = await this.passwordService.hashPassword(
        dto.password,
      );
      //create user
      const newUser = await this.prisma.user.create({
        data: {
          email: dto.email,
          name: dto.name,
          password: hashedPassword,
          role: dto.role || "customer",
        },
      });

      //@ts-ignore
      delete newUser.password;

      return newUser;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new BadRequestException("User already exists");
      }
      throw new InternalServerErrorException("Something went wrong");
    }
  }
}
