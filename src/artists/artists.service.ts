import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Artist } from './interfaces/artist.interface';

@Injectable()
export class ArtistsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<Artist[]> {
    return await this.prisma.artist.findMany();
  }

  async create(artist: CreateArtistDto): Promise<Artist> {
    return await this.prisma.artist.create({
      data: artist,
    });
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.prisma.artist.findUnique({ where: { id } });

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    return await this.prisma.artist.update({
      where: { id },
      data: { ...artist, ...updateArtistDto },
    });
  }

  async getById(id: string) {
    const artist = await this.prisma.artist.findUnique({ where: { id } });

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  async delete(id: string) {
    const artist = await this.prisma.artist.findUnique({ where: { id } });

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    await this.prisma.artist.delete({ where: { id } });
  }
}
