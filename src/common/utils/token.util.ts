import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class TokenService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async generateAccessToken(payload: Record<string, any>): Promise<string> {
        const signedToken = await this.jwtService.signAsync(payload, {
            secret: this.configService.get<string>("JWT_SECRET"),
            expiresIn:
                (this.configService.get<string>("JWT_EXPIRY") as any) || "1h",
        });

        return signedToken;
    }

    async verifyToken(token: string): Promise<any | null> {
        try {
            return await this.jwtService.verifyAsync(token, {
                secret: this.configService.get<string>("JWT_SECRET"),
            });
        } catch {
            return null;
        }
    }
}
