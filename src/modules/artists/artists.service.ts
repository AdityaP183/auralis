import { ConflictException, Injectable, Logger } from "@nestjs/common";
import { AuthService } from "../auth/auth.service";
import { CreateArtistDto } from "./dto/create-artist.dto";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class ArtistsService {
    private readonly logger = new Logger(AuthService.name);
    constructor(private readonly prismaSerivce: PrismaService) {}

    async createArtist(createArtistDto: CreateArtistDto, userId: string) {
        const artist = await this.prismaSerivce.artist.findFirst({
            where: {
                userId,
            },
            include: {
                user: {
                    select: { role: true },
                },
            },
        });
        if (artist) {
            throw new ConflictException("Artist already exists");
        }

        const user = await this.prismaSerivce.user.findFirst({
            where: {
                id: userId,
            },
        });

        if (user && user.role === "ADMIN") {
            throw new ConflictException("Admin cannot be an artist");
        }

        const artistCreated = await this.prismaSerivce.$transaction(
            async (tx) => {
                const artist = await tx.artist.create({
                    data: {
                        bio: createArtistDto.bio,
                        userId,
                    },
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,

                                email: true,
                            },
                        },
                    },
                });

                await tx.user.update({
                    where: {
                        id: userId,
                    },
                    data: {
                        role: "ARTIST",
                    },
                });

                return artist;
            },
        );

        this.logger.log(`Artist ${artistCreated.id} created.`);

        return artistCreated;
    }
}
