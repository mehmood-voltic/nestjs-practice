import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { loginDto, signupDto } from "./dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import * as bcrypt from "bcryptjs";
import { UsersService } from "src/users/users.service";
import { User } from "@prisma/client";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  async validateUser(dto: loginDto): Promise<User | null> {
    const user = await this.usersService.findUserByEmail(dto.email);

    //check if the user exists
    if (!user) return null;

    //validate password
    const isValidPassword = await this.validatePassword(
      dto.password,
      user.password,
    );

    if (!isValidPassword) return null;

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

  async authenticateUser(dto: loginDto):Promise<any> {
    const user = await this.validateUser(dto);

    if (!user) {
      throw new BadRequestException("Invalid login credentials");
    }

    const accessToken = await this.signin(user);

    console.log('AccessToken: ', accessToken);
    console.log('User: ', user);

    //@ts-ignore
    delete user.password

    return {
      user,
      accessToken,
    };
  }

  async signup(dto: signupDto): Promise<any> {
    console.log(dto);
    try {
      //generate password hash
      const hashedPassword = await this.hashPassword(dto.password);
      //create user
      const newUser = await this.prisma.user.create({
        data: {
          email: dto.email,
          name: dto.name,
          password: hashedPassword,
          role: dto.role || "customer",
        },
      });

      return {
        ...newUser,
        password: undefined,
      };
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
