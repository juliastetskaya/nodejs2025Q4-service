import { Injectable, UnprocessableEntityException } from '@nestjs/common';

import { Artist } from '../artists/interfaces/artist.interface';
import { Album } from '../albums/interfaces/album.interface';
import { Track } from '../tracks/interfaces/track.interface';
import { PrismaService } from '../prisma/prisma.service';

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<FavoritesResponse> {
    const albums = await this.prisma.album.findMany({
      where: { isFavorite: true },
    });
    const artists = await this.prisma.artist.findMany({
      where: { isFavorite: true },
    });
    const tracks = await this.prisma.track.findMany({
      where: { isFavorite: true },
    });

    return {
      albums: this.excludeFavorite(albums) as Album[],
      artists: this.excludeFavorite(artists) as Artist[],
      tracks: this.excludeFavorite(tracks) as Track[],
    };
  }

  excludeFavorite(array: Album[] | Artist[] | Track[]) {
    return array.map((item: Record<string, any>) => {
      const { isFavorite, ...rest } = item;

      return rest;
    });
  }

  async addTrack(id: string): Promise<Track> {
    try {
      const track = await this.prisma.track.update({
        where: { id },
        data: { isFavorite: true },
      });

      return track;
    } catch (error) {
      throw new UnprocessableEntityException('Track not found');
    }
  }

  async removeTrack(id: string): Promise<void> {
    try {
      await this.prisma.track.update({
        where: { id },
        data: { isFavorite: false },
      });
    } catch (error) {
      throw new UnprocessableEntityException('Track not found');
    }
  }

  async addAlbum(id: string): Promise<void> {
    try {
      await this.prisma.album.update({
        where: { id },
        data: { isFavorite: true },
      });
    } catch (error) {
      throw new UnprocessableEntityException('Album not found');
    }
  }

  async removeAlbum(id: string): Promise<void> {
    try {
      await this.prisma.album.update({
        where: { id },
        data: { isFavorite: false },
      });
    } catch (error) {
      throw new UnprocessableEntityException('Album not found');
    }
  }

  async addArtist(id: string): Promise<void> {
    try {
      await this.prisma.artist.update({
        where: { id },
        data: { isFavorite: true },
      });
    } catch (error) {
      throw new UnprocessableEntityException('Artist not found');
    }
  }

  async removeArtist(id: string): Promise<void> {
    try {
      await this.prisma.artist.update({
        where: { id },
        data: { isFavorite: false },
      });
    } catch (error) {
      throw new UnprocessableEntityException('Artist not found');
    }
  }
}
