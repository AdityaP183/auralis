import { IsOptional, IsString } from "class-validator";

export class CreateAlbumDto {
    @IsString()
    title: string;

    @IsString()
    @IsOptional()
    duration: number;
}
