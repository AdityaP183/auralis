import { Module } from "@nestjs/common";
import { HashService } from "./utils/hash.util";
import { TokenService } from "./utils/token.util";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [JwtModule],
    providers: [HashService, TokenService],
    exports: [HashService, TokenService],
})
export class CommonModule {}
