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
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  getAll() {
    return this.tracksService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    try {
      return this.tracksService.getById(id);
    } catch (error) {
      if (error.message === 'Invalid id') {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }

      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  @HttpCode(201)
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.tracksService.create(createTrackDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    try {
      return this.tracksService.update(id, updateTrackDto);
    } catch (error) {
      if (error.message === 'Invalid id') {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }

      if (error.message === 'Track not found') {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    try {
      return this.tracksService.delete(id);
    } catch (error) {
      if (error.message === 'Invalid id') {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }

      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
