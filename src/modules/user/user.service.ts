import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { RegisterDto } from "../auth/dto/register-user.dto";

@Injectable()
export class UserService {
    constructor(private readonly prismaSerivce: PrismaService) {}

    async getUserByEmail(email: string) {
        const user = await this.prismaSerivce.user.findFirst({
            where: { email },
        });

        return user;
    }

    async createUser(registerDto: RegisterDto) {
        const user = await this.prismaSerivce.user.create({
            data: registerDto,
        });

        return user;
    }
}
