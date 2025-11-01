import {
    ConflictException,
    Injectable,
    Logger,
    NotFoundException,
    ForbiddenException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateArtistDto } from "./dto/create-artist.dto";

@Injectable()
export class ArtistsService {
    private readonly logger = new Logger(ArtistsService.name);

    constructor(private readonly prismaService: PrismaService) {}

    async createArtist(createArtistDto: CreateArtistDto, userId: string) {
        const existingArtist = await this.prismaService.artist.findFirst({
            where: { userId },
            include: { user: { select: { role: true } } },
        });

        if (existingArtist) {
            throw new ConflictException("Artist already exists for this user");
        }

        const user = await this.prismaService.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new NotFoundException("User not found");
        }

        if (user.role === "ADMIN") {
            throw new ForbiddenException("Admin cannot become an artist");
        }

        const artistCreated = await this.prismaService.$transaction(
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
                                role: true,
                            },
                        },
                    },
                });

                await tx.user.update({
                    where: { id: userId },
                    data: { role: "ARTIST" },
                });

                return artist;
            },
        );

        this.logger.log(`Artist ${artistCreated.id} created successfully.`);
        return artistCreated;
    }

    async getAllArtists() {
        const artists = await this.prismaService.artist.findMany({
            include: {
                user: { select: { id: true, name: true, email: true } },
            },
        });

        return artists;
    }

    async getArtistById(id: string) {
        const artist = await this.prismaService.artist.findUnique({
            where: { id },
            include: {
                user: { select: { id: true, name: true, email: true } },
            },
        });

        if (!artist) {
            throw new NotFoundException("Artist not found");
        }

        return artist;
    }

    async updateArtist(id: string, updateArtistDto: CreateArtistDto) {
        const artist = await this.prismaService.artist.findUnique({
            where: { id },
        });
        if (!artist) {
            throw new NotFoundException("Artist not found");
        }

        const artistUpdated = await this.prismaService.artist.update({
            where: { id },
            data: { bio: updateArtistDto.bio },
        });

        this.logger.log(`Artist ${artistUpdated.id} updated successfully.`);
        return artistUpdated;
    }

    async deleteArtist(id: string) {
        const artist = await this.prismaService.artist.findUnique({
            where: { id },
        });
        if (!artist) {
            throw new NotFoundException("Artist not found");
        }

        const artistDeleted = await this.prismaService.artist.delete({
            where: { id },
        });

        await this.prismaService.user.update({
            where: { id: artist.userId },
            data: { role: "USER" },
        });

        this.logger.log(`Artist ${artistDeleted.id} deleted successfully.`);
        return artistDeleted;
    }
}
