import { Module } from "@nestjs/common";
import { ArtistsService } from "./artists.service";
import { ArtistsController } from "./artists.controller";
import { PrismaService } from "src/prisma.service";

@Module({
    providers: [ArtistsService, PrismaService],
    controllers: [ArtistsController],
})
export class ArtistsModule {}
