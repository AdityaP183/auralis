import { ConflictException, Injectable } from "@nestjs/common";
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

    async getUserById(id: string) {
        const user = await this.prismaSerivce.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true,
                artist: {
                    select: {
                        id: true,
                        bio: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                },
            },
        });
        if (!user) {
            throw new ConflictException("User not found");
        }

        return user;
    }
}
