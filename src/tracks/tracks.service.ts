import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './interfaces/track.interface';

@Injectable()
export class TracksService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<Track[]> {
    return await this.prisma.track.findMany();
  }

  async create(track: CreateTrackDto): Promise<Track> {
    return await this.prisma.track.create({
      data: { ...track },
    });
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    const track = await this.prisma.track.findUnique({ where: { id } });

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    return await this.prisma.track.update({
      where: { id },
      data: { ...track, ...updateTrackDto },
    });
  }

  async getById(id: string): Promise<Track> {
    const track = await this.prisma.track.findUnique({ where: { id } });

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    return track;
  }

  async delete(id: string): Promise<void> {
    const track = await this.prisma.track.findUnique({ where: { id } });

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    await this.prisma.track.delete({ where: { id } });
  }
}
