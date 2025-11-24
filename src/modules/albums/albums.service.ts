import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateAlbumDto } from "./dto/create-album.dto";
import { UpdateAlbumDto } from "./dto/update-album.dto";

@Injectable()
export class AlbumsService {
    private readonly logger = new Logger(AlbumsService.name);

    constructor(private readonly prismaService: PrismaService) {}

    async createAlbum(createAlbumDto: CreateAlbumDto, userId: string) {
        const user = await this.prismaService.user.findFirst({
            where: { id: userId },
            include: {
                artist: true,
            },
        });

        if (!user) {
            throw new NotFoundException("Artist not found");
        }

        if (user.role !== "ARTIST" || !user.artist) {
            throw new NotFoundException(
                "Albums can only be created by artists",
            );
        }

        const albumCreated = await this.prismaService.album.create({
            data: {
                title: createAlbumDto.title,
                duration: createAlbumDto.duration,
                artistId: user.artist.id,
            },
        });

        this.logger.log(`Album ${albumCreated.id} created successfully.`);
        return albumCreated;
    }

    async getAllAlbums(userId: string) {
        const albums = await this.prismaService.album.findMany({
            where: {
                artist: {
                    userId,
                },
            },
        });

        if (!albums) {
            throw new NotFoundException("Albums not found");
        }

        return albums;
    }

    async getAlbumById(albumId: string, userId: string) {
        const album = await this.prismaService.album.findUnique({
            where: { id: albumId, artist: { userId } },
        });

        if (!album) {
            throw new NotFoundException("Album not found");
        }

        return album;
    }

    async updateAlbum(
        albumUpdateDto: UpdateAlbumDto,
        albumId: string,
        userId: string,
    ) {
        const album = await this.prismaService.album.findUnique({
            where: { id: albumId, artist: { userId } },
        });

        if (!album) {
            throw new NotFoundException("Album not found");
        }

        const albumUpdated = await this.prismaService.album.update({
            where: { id: albumId },
            data: {
                title: albumUpdateDto.title,
                duration: albumUpdateDto.duration,
            },
        });

        this.logger.log(`Album ${albumUpdated.id} updated successfully.`);
        return albumUpdated;
    }

    async deleteAlbum(albumId: string, userId: string) {
        const album = await this.prismaService.album.findUnique({
            where: { id: albumId, artist: { userId } },
        });

        if (!album) {
            throw new NotFoundException("Album not found");
        }

        const albumDeleted = await this.prismaService.album.delete({
            where: { id: albumId },
        });

        this.logger.log(`Album ${albumDeleted.id} deleted successfully.`);
        return albumDeleted;
    }
}
