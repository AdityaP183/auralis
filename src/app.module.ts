import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { SongsModule } from './modules/songs/songs.module';
import { ArtistsModule } from './modules/artists/artists.module';
import { AlbumsModule } from './modules/albums/albums.module';
import { GenresModule } from './modules/genres/genres.module';

@Module({
    controllers: [AppController],
    providers: [AppService],
    imports: [AuthModule, UserModule, SongsModule, ArtistsModule, AlbumsModule, GenresModule],
})
export class AppModule {}
