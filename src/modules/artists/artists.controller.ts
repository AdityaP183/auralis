import {
    Body,
    Controller,
    Get,
    Patch,
    Post,
    Delete,
    Param,
    Request,
    UseGuards,
} from "@nestjs/common";
import { ArtistsService } from "./artists.service";
import { AuthGuard } from "../auth/auth.guard";
import { CreateArtistDto } from "./dto/create-artist.dto";

@Controller("artists")
@UseGuards(AuthGuard)
export class ArtistsController {
    constructor(private readonly artistsService: ArtistsService) {}

    @Post()
    async createArtist(
        @Body() createArtistDto: CreateArtistDto,
        @Request() req: { user: { sub: string } },
    ) {
        return this.artistsService.createArtist(createArtistDto, req.user.sub);
    }

    @Get()
    async getAllArtists() {
        return this.artistsService.getAllArtists();
    }

    @Get(":id")
    async getArtistById(@Param("id") id: string) {
        return this.artistsService.getArtistById(id);
    }

    @Patch(":id")
    async updateArtist(
        @Param("id") id: string,
        @Body() updateArtistDto: CreateArtistDto,
    ) {
        return this.artistsService.updateArtist(id, updateArtistDto);
    }

    @Delete(":id")
    async deleteArtist(@Param("id") id: string) {
        return this.artistsService.deleteArtist(id);
    }
}
