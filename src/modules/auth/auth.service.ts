import { ConflictException, Injectable, Logger } from "@nestjs/common";
import { RegisterDto } from "./dto/register-user.dto";
import { LoginDto } from "./dto/login-user.dto";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);
    constructor(private readonly userService: UserService) {}

    async register(registerDto: RegisterDto) {
        const existingUser = await this.userService.getUserByEmail(
            registerDto.email,
        );
        if (existingUser) {
            throw new ConflictException("User with that email already exists!");
        }

        return existingUser;
    }

    async login(loginDto: LoginDto) {}

    async logout() {}
}
