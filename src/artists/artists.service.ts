import { Inject, Injectable } from '@nestjs/common';

import { ARTISTS_STORE_TOKEN } from './artists.store';
import { ArtistsStore } from './interfaces/artists-store.interface';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import {
  FAVORITES_STORE_TOKEN,
  FavoritesStoreInterface,
} from '../favorites/favorites.store';

@Injectable()
export class ArtistsService {
  constructor(
    @Inject(ARTISTS_STORE_TOKEN) private readonly artistsStore: ArtistsStore,
    @Inject(FAVORITES_STORE_TOKEN)
    private readonly favoritesStore: FavoritesStoreInterface,
  ) {}

  getAll() {
    return this.artistsStore.getAllArtists();
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
    this.favoritesStore.removeArtist(id);
    return this.artistsStore.delete(id);
  }
}
