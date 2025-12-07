import { Inject, Injectable } from '@nestjs/common';
import { validate } from 'uuid';

import {
  FAVORITES_STORE_TOKEN,
  FavoritesStoreInterface,
} from './favorites.store';
import { Artist } from '../artists/interfaces/artist.interface';
import { Album } from '../albums/interfaces/album.interface';
import { Track } from '../tracks/interfaces/track.interface';

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

@Injectable()
export class FavoritesService {
  constructor(
    @Inject(FAVORITES_STORE_TOKEN)
    private readonly favoritesStore: FavoritesStoreInterface,
  ) {}

  getAll(): FavoritesResponse {
    return { artists: [], albums: [], tracks: [] };
  }

  addTrack(id: string): void {
    if (!validate(id)) {
      throw new Error('Invalid id');
    }

    this.favoritesStore.addTrack(id);
  }

  removeTrack(id: string): void {
    if (!validate(id)) {
      throw new Error('Invalid id');
    }

    const removed = this.favoritesStore.removeTrack(id);
    if (!removed) {
      throw new Error('Track is not favorite');
    }
  }

  addAlbum(id: string): void {
    if (!validate(id)) {
      throw new Error('Invalid id');
    }

    this.favoritesStore.addAlbum(id);
  }

  removeAlbum(id: string): void {
    if (!validate(id)) {
      throw new Error('Invalid id');
    }

    const removed = this.favoritesStore.removeAlbum(id);
    if (!removed) {
      throw new Error('Album is not favorite');
    }
  }

  addArtist(id: string): void {
    if (!validate(id)) {
      throw new Error('Invalid id');
    }

    this.favoritesStore.addArtist(id);
  }

  removeArtist(id: string): void {
    if (!validate(id)) {
      throw new Error('Invalid id');
    }

    const removed = this.favoritesStore.removeArtist(id);
    if (!removed) {
      throw new Error('Artist is not favorite');
    }
  }
}
