import { Injectable, NotFoundException } from '@nestjs/common';

import { Album } from './interfaces/album.interface';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AlbumsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<Album[]> {
    return await this.prisma.album.findMany();
  }

  async create(album: CreateAlbumDto): Promise<Album> {
    return await this.prisma.album.create({
      data: { ...album },
    });
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const album = await this.prisma.album.findUnique({ where: { id } });

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return await this.prisma.album.update({
      where: { id },
      data: {
        ...updateAlbumDto,
      },
    });
  }

  async getById(id: string): Promise<Album> {
    const album = await this.prisma.album.findUnique({ where: { id } });

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return album;
  }

  async delete(id: string): Promise<void> {
    const album = await this.prisma.album.findUnique({ where: { id } });

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    await this.prisma.album.delete({ where: { id } });
  }
}
