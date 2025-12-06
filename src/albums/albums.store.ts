import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4, validate } from 'uuid';

import { AlbumsStore } from './interfaces/albums-store.interface';
import { Album } from './interfaces/album.interface';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { TRACKS_STORE_TOKEN } from '../tracks/tracks.store';
import { TracksStore } from '../tracks/interfaces/tracks-store.interface';

export const ALBUMS_STORE_TOKEN = 'ALBUMS_STORE';

@Injectable()
class InMemoryAlbumsStore implements AlbumsStore {
  private albums: Album[] = [];

  constructor(
    @Inject(TRACKS_STORE_TOKEN) private readonly tracksStore: TracksStore,
  ) {
    this.albums = [];
  }

  getAllAlbums(): Album[] {
    return this.albums;
  }

  getAlbumById(id: string): Album {
    if (!validate(id)) {
      throw new Error('Invalid id');
    }

    const album = this.albums.find((album) => album.id === id);

    if (!album) {
      throw new Error('Album not found');
    }

    return album;
  }

  create(album: CreateAlbumDto): Album {
    const newAlbum = {
      ...album,
      id: uuidv4(),
    };

    this.albums.push(newAlbum);

    return newAlbum;
  }

  update(id: string, data: UpdateAlbumDto): Album {
    if (!validate(id)) {
      throw new Error('Invalid id');
    }

    const album = this.albums.find((album) => album.id === id);

    if (!album) {
      throw new Error('Album not found');
    }

    Object.assign(album, data);
    this.albums = this.albums.map((a) => (a.id === id ? album : a));

    return album;
  }

  delete(id: string): void {
    if (!validate(id)) {
      throw new Error('Invalid id');
    }

    const album = this.albums.find((album) => album.id === id);

    if (!album) {
      throw new Error('Album not found');
    }

    const tracks = this.tracksStore.getAllTracks();
    tracks.forEach((track) => {
      if (track.albumId === id) {
        this.tracksStore.update(track.id, { ...track, albumId: null });
      }
    });

    this.albums = this.albums.filter((album) => album.id !== id);
  }
}

export default InMemoryAlbumsStore;
