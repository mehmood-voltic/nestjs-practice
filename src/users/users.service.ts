import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma:PrismaService){}
    async findUserByEmail(email:string):Promise<User | null> {
        return await this.prisma.user.findUnique({
            where: {
                email,
            },
        })
    }
}
