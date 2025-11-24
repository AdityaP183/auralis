import { Module } from "@nestjs/common";
import { AlbumsService } from "./albums.service";
import { AlbumsController } from "./albums.controller";
import { PrismaService } from "src/prisma.service";

@Module({
    providers: [AlbumsService, PrismaService],
    controllers: [AlbumsController],
})
export class AlbumsModule {}
