import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getAll() {
    return this.favoritesService.getAll();
  }

  @Post('track/:id')
  @HttpCode(201)
  addTrack(@Param('id') id: string) {
    try {
      this.favoritesService.addTrack(id);
      return { message: 'Track added to favorites' };
    } catch (error) {
      if (error.message === 'Invalid id') {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }

      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrack(@Param('id') id: string) {
    try {
      this.favoritesService.removeTrack(id);
    } catch (error) {
      if (error.message === 'Invalid id') {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }

      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post('album/:id')
  @HttpCode(201)
  addAlbum(@Param('id') id: string) {
    try {
      this.favoritesService.addAlbum(id);
      return { message: 'Album added to favorites' };
    } catch (error) {
      if (error.message === 'Invalid id') {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }

      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbum(@Param('id') id: string) {
    try {
      this.favoritesService.removeAlbum(id);
    } catch (error) {
      if (error.message === 'Invalid id') {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }

      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post('artist/:id')
  @HttpCode(201)
  addArtist(@Param('id') id: string) {
    try {
      this.favoritesService.addArtist(id);
      return { message: 'Artist added to favorites' };
    } catch (error) {
      if (error.message === 'Invalid id') {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }

      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtist(@Param('id') id: string) {
    try {
      this.favoritesService.removeArtist(id);
    } catch (error) {
      if (error.message === 'Invalid id') {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }

      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
