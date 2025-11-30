import { IsString, IsNumber, ValidateIf } from 'class-validator';

export class UpdateAlbumDto {
  @IsString()
  name: string;

  @IsNumber()
  year: number;

  @ValidateIf((o) => o.artistId !== null)
  @IsString()
  artistId: string | null; // refers to Artist
}
