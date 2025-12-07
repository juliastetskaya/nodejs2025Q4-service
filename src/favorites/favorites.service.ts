import { Inject, Injectable } from '@nestjs/common';
import { validate } from 'uuid';

import {
  FAVORITES_STORE_TOKEN,
  FavoritesStoreInterface,
} from './favorites.store';
import { ARTISTS_STORE_TOKEN } from '../artists/artists.store';
import { ArtistsStore } from '../artists/interfaces/artists-store.interface';
import { TRACKS_STORE_TOKEN } from '../tracks/tracks.store';
import { TracksStore } from '../tracks/interfaces/tracks-store.interface';
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
    @Inject(ARTISTS_STORE_TOKEN)
    private readonly artistsStore: ArtistsStore,
    @Inject(TRACKS_STORE_TOKEN)
    private readonly tracksStore: TracksStore,
  ) {}

  getAll(): FavoritesResponse {
    const artistIds = this.favoritesStore.getArtistIds();
    const trackIds = this.favoritesStore.getTrackIds();

    const artists = artistIds
      .map((id) => {
        try {
          return this.artistsStore.getArtistById(id);
        } catch {
          return null;
        }
      })
      .filter((artist) => artist !== null);

    const tracks = trackIds
      .map((id) => {
        try {
          return this.tracksStore.getTrackById(id);
        } catch {
          return null;
        }
      })
      .filter((track) => track !== null);

    return { artists, albums: [], tracks };
  }

  addTrack(id: string): void {
    if (!validate(id)) {
      throw new Error('Invalid id');
    }

    this.tracksStore.getTrackById(id);
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

    this.artistsStore.getArtistById(id);
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
