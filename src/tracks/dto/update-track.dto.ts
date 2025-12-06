import { IsString, IsNumber, ValidateIf } from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  name: string;

  @ValidateIf((o) => o.artistId !== null)
  @IsString()
  artistId: string | null; // refers to Artist

  @ValidateIf((o) => o.albumId !== null)
  @IsString()
  albumId: string | null; // refers to Album

  @IsNumber()
  duration: number; // integer number
}
