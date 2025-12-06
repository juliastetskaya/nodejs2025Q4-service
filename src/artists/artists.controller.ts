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
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  getAll() {
    return this.artistsService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    try {
      return this.artistsService.getById(id);
    } catch (error) {
      if (error.message === 'Invalid id') {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }

      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  @HttpCode(201)
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistsService.create(createArtistDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto) {
    try {
      return this.artistsService.update(id, updateArtistDto);
    } catch (error) {
      if (error.message === 'Invalid id') {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }

      if (error.message === 'Artist not found') {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    try {
      return this.artistsService.delete(id);
    } catch (error) {
      if (error.message === 'Invalid id') {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }

      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
