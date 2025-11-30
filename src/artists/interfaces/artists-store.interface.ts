import { Artist } from './artist.interface';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';

export interface ArtistsStore {
  getAllArtists(): Artist[];
  getArtistById(id: string): Artist;
  create(artist: CreateArtistDto): Artist;
  update(id: string, data: UpdateArtistDto): Artist;
  delete(id: string): void;
}
