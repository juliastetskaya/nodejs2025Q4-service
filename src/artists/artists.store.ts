import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4, validate } from 'uuid';

import { ArtistsStore } from './interfaces/artists-store.interface';
import { Artist } from './interfaces/artist.interface';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { TRACKS_STORE_TOKEN } from '../tracks/tracks.store';
import { TracksStore } from '../tracks/interfaces/tracks-store.interface';
import { ALBUMS_STORE_TOKEN } from '../albums/albums.store';
import { AlbumsStore } from '../albums/interfaces/albums-store.interface';

export const ARTISTS_STORE_TOKEN = 'ARTISTS_STORE';

@Injectable()
class InMemoryArtistsStore implements ArtistsStore {
  private artists: Artist[] = [];

  constructor(
    @Inject(TRACKS_STORE_TOKEN) private readonly tracksStore: TracksStore,
    @Inject(ALBUMS_STORE_TOKEN) private readonly albumsStore: AlbumsStore,
  ) {
    this.artists = [];
  }

  getAllArtists(): Artist[] {
    return this.artists;
  }

  getArtistById(id: string): Artist {
    if (!validate(id)) {
      throw new Error('Invalid id');
    }

    const artist = this.artists.find((artist) => artist.id === id);

    if (!artist) {
      throw new Error('Artist not found');
    }

    return artist;
  }

  create(artist: CreateArtistDto): Artist {
    const newArtist = {
      ...artist,
      id: uuidv4(),
    };

    this.artists.push(newArtist);

    return newArtist;
  }

  update(id: string, data: UpdateArtistDto): Artist {
    if (!validate(id)) {
      throw new Error('Invalid id');
    }

    const artist = this.artists.find((artist) => artist.id === id);

    if (!artist) {
      throw new Error('Artist not found');
    }

    Object.assign(artist, data);
    this.artists = this.artists.map((a) => (a.id === id ? artist : a));

    return artist;
  }

  delete(id: string): void {
    if (!validate(id)) {
      throw new Error('Invalid id');
    }

    const artist = this.artists.find((artist) => artist.id === id);

    if (!artist) {
      throw new Error('Artist not found');
    }

    const tracks = this.tracksStore.getAllTracks();
    tracks.forEach((track) => {
      if (track.artistId === id) {
        this.tracksStore.update(track.id, { ...track, artistId: null });
      }
    });

    const albums = this.albumsStore.getAllAlbums();
    albums.forEach((album) => {
      if (album.artistId === id) {
        this.albumsStore.update(album.id, { ...album, artistId: null });
      }
    });

    this.artists = this.artists.filter((artist) => artist.id !== id);
  }
}

export default InMemoryArtistsStore;
