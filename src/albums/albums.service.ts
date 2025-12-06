import { Inject, Injectable } from '@nestjs/common';

import { ALBUMS_STORE_TOKEN } from './albums.store';
import { AlbumsStore } from './interfaces/albums-store.interface';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import {
  FAVORITES_STORE_TOKEN,
  FavoritesStoreInterface,
} from '../favorites/favorites.store';

@Injectable()
export class AlbumsService {
  constructor(
    @Inject(ALBUMS_STORE_TOKEN) private readonly albumsStore: AlbumsStore,
    @Inject(FAVORITES_STORE_TOKEN)
    private readonly favoritesStore: FavoritesStoreInterface,
  ) {}

  getAll() {
    return this.albumsStore.getAllAlbums();
  }

  create(album: CreateAlbumDto) {
    return this.albumsStore.create(album);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return this.albumsStore.update(id, updateAlbumDto);
  }

  getById(id: string) {
    return this.albumsStore.getAlbumById(id);
  }

  delete(id: string) {
    this.favoritesStore.removeAlbum(id);
    return this.albumsStore.delete(id);
  }
}
