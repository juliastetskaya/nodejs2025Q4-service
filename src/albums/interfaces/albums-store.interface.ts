import type { Album } from './album.interface';
import type { CreateAlbumDto } from '../dto/create-album.dto';
import type { UpdateAlbumDto } from '../dto/update-album.dto';

export interface AlbumsStore {
  getAllAlbums(): Album[];
  getAlbumById(id: string): Album;
  create(album: CreateAlbumDto): Album;
  update(id: string, data: UpdateAlbumDto): Album;
  delete(id: string): void;
}
