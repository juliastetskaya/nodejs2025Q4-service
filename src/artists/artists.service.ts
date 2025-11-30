import { Inject, Injectable } from '@nestjs/common';

import { ARTISTS_STORE_TOKEN } from './artists.store';
import { ArtistsStore } from './interfaces/artists-store.interface';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistsService {
  constructor(
    @Inject(ARTISTS_STORE_TOKEN) private readonly artistsStore: ArtistsStore,
  ) {}

  getAll() {
    return this.artistsStore.getAll();
  }

  create(artist: CreateArtistDto) {
    return this.artistsStore.create(artist);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    return this.artistsStore.update(id, updateArtistDto);
  }

  getById(id: string) {
    return this.artistsStore.getArtistById(id);
  }

  delete(id: string) {
    return this.artistsStore.delete(id);
  }
}
