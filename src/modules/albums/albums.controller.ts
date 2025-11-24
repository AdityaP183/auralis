import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Request,
    UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import { AlbumsService } from "./albums.service";
import { CreateAlbumDto } from "./dto/create-album.dto";
import { UpdateAlbumDto } from "./dto/update-album.dto";

@Controller("albums")
@UseGuards(AuthGuard)
export class AlbumsController {
    constructor(private readonly albumsService: AlbumsService) {}

    @Post()
    async createAlbum(
        @Body() createAlbumDto: CreateAlbumDto,
        @Request() req: { user: { sub: string } },
    ) {
        return this.albumsService.createAlbum(createAlbumDto, req.user.sub);
    }

    @Get()
    async getAllAlbums(@Request() req: { user: { sub: string } }) {
        return this.albumsService.getAllAlbums(req.user.sub);
    }

    @Get(":id")
    async getAlbumById(
        @Param("id") id: string,
        @Request() req: { user: { sub: string } },
    ) {
        return this.albumsService.getAlbumById(id, req.user.sub);
    }

    @Patch(":id")
    async updateAlbum(
        @Param("id") id: string,
        @Body() albumUpdateDto: UpdateAlbumDto,
        @Request() req: { user: { sub: string } },
    ) {
        return this.albumsService.updateAlbum(albumUpdateDto, id, req.user.sub);
    }

    @Delete(":id")
    async deleteAlbum(
        @Param("id") id: string,
        @Request() req: { user: { sub: string } },
    ) {
        return this.albumsService.deleteAlbum(id, req.user.sub);
    }
}
