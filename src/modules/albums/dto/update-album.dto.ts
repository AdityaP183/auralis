import { IsOptional, IsString } from "class-validator";

export class UpdateAlbumDto {
    @IsString()
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    duration: number;
}
