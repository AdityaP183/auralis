import { ConflictException, Injectable, Logger } from "@nestjs/common";
import { RegisterDto } from "./dto/register-user.dto";
import { LoginDto } from "./dto/login-user.dto";
import { UserService } from "../user/user.service";
import { HashService } from "src/common/utils/hash.util";
import { TokenService } from "src/common/utils/token.util";

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);
    constructor(
        private readonly userService: UserService,
        private readonly hashService: HashService,
        private readonly tokenService: TokenService,
    ) {}

    async register(registerDto: RegisterDto) {
        const existingUser = await this.userService.getUserByEmail(
            registerDto.email,
        );
        if (existingUser) {
            throw new ConflictException("User with that email already exists!");
        }

        const hashedPassword = await this.hashService.hashPassword(
            registerDto.password,
        );

        const { password, ...safeUserData } = await this.userService.createUser(
            {
                ...registerDto,
                password: hashedPassword,
            },
        );

        this.logger.log(`User ${safeUserData.id} created.`);

        const payload = { sub: safeUserData.id, username: safeUserData.email };
        const accessToken =
            await this.tokenService.generateAccessToken(payload);

        return {
            user: safeUserData,
            accessToken,
        };
    }

    async login(loginDto: LoginDto) {}

    async logout() {}
}
