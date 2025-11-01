import {
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID
} from "class-validator";

export class CreateArtistDto {
    @IsOptional()
    @IsString()
    bio: string;
}
