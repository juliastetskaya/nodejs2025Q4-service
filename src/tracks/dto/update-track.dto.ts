import { IsString, IsNumber, ValidateIf, IsOptional } from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  @IsOptional()
  name?: string;

  @ValidateIf((o) => o.artistId !== null)
  @IsOptional()
  @IsString()
  artistId?: string | null; // refers to Artist

  @ValidateIf((o) => o.albumId !== null)
  @IsOptional()
  @IsString()
  albumId?: string | null; // refers to Album

  @IsNumber()
  @IsOptional()
  duration?: number; // integer number
}
