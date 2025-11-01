import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { ArtistsService } from "./artists.service";
import { AuthGuard } from "../auth/auth.guard";
import { CreateArtistDto } from "./dto/create-artist.dto";

@Controller("artists")
export class ArtistsController {
    constructor(private readonly artistService: ArtistsService) {}

    @Post()
    @UseGuards(AuthGuard)
    async createArtist(@Body() createArtistDto: CreateArtistDto, @Request() req: { user: { sub: string } }) {
        return this.artistService.createArtist(createArtistDto, req.user.sub);
    }
}
