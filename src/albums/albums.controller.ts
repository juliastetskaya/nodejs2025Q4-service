import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  getAll() {
    return this.albumsService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    try {
      return this.albumsService.getById(id);
    } catch (error) {
      if (error.message === 'Invalid id') {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }

      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  @HttpCode(201)
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.create(createAlbumDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    try {
      return this.albumsService.update(id, updateAlbumDto);
    } catch (error) {
      if (error.message === 'Invalid id') {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }

      if (error.message === 'Album not found') {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    try {
      return this.albumsService.delete(id);
    } catch (error) {
      if (error.message === 'Invalid id') {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }

      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
