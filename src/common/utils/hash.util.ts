import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class HashService {
    constructor(private readonly configService: ConfigService) {}

    async hashPassword(password: string): Promise<string> {
        const saltRounds = parseInt(
            this.configService.get<string>("SALT_ROUNDS") || "10",
            10,
        );
        return bcrypt.hash(password, saltRounds);
    }

    async comparePassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}
