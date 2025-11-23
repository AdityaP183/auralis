import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

export interface TokenPayload {
    sub: string;
    email?: string;
    role?: string;
    [key: string]: unknown;
}

@Injectable()
export class TokenService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async generateAccessToken(payload: TokenPayload): Promise<string> {
        const signedToken = await this.jwtService.signAsync(payload, {
            secret: this.configService.get<string>("JWT_SECRET"),
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            expiresIn:
                (this.configService.get<string>("JWT_EXPIRY") as any) || "1h",
        });

        return signedToken;
    }

    async verifyToken(token: string): Promise<TokenPayload | null> {
        try {
            const decodedToken =
                await this.jwtService.verifyAsync<TokenPayload>(token, {
                    secret: this.configService.get<string>("JWT_SECRET"),
                });

            return decodedToken;
        } catch {
            return null;
        }
    }
}
