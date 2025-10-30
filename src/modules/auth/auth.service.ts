import {
    ConflictException,
    Injectable,
    Logger,
    UnauthorizedException,
} from "@nestjs/common";
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

    async login(loginDto: LoginDto) {
        const user = await this.userService.getUserByEmail(loginDto.email);
        if (!user) {
            throw new ConflictException(
                "Login Failed! Email or password is incorrect.",
            );
        }

        const isPasswordValid = await this.hashService.comparePassword(
            loginDto.password,
            user.password,
        );
        if (!isPasswordValid) {
            throw new UnauthorizedException(
                "Login Failed! Email or password is incorrect.",
            );
        }

        const payload = { sub: user.id, email: user.email };
        const accessToken =
            await this.tokenService.generateAccessToken(payload);

        this.logger.log(`User ${user.email} logged in.`);

        const { password, ...safeUserData } = user;
        return { accessToken, user: safeUserData };
    }

    async logout() {
        this.logger.log(
            "Logout endpoint hit. JWT invalidation is client-side.",
        );
        return {
            message:
                "Successfully logged out. Please discard your token client-side.",
        };
    }

    async profile(id: string) {
        const user = await this.userService.getUserById(id);
        if (!user) {
            throw new UnauthorizedException("Invalid or expired token");
        }

        const { password, ...safeUserData } = user;

        return safeUserData;
    }
}
