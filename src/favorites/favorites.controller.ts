import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async getAll() {
    return await this.favoritesService.getAll();
  }

  @Post('track/:id')
  @HttpCode(201)
  async addTrack(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
  ) {
    await this.favoritesService.addTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  async removeTrack(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
  ) {
    await this.favoritesService.removeTrack(id);
  }

  @Post('album/:id')
  @HttpCode(201)
  async addAlbum(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
  ) {
    await this.favoritesService.addAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  async removeAlbum(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
  ) {
    await this.favoritesService.removeAlbum(id);
  }

  @Post('artist/:id')
  @HttpCode(201)
  async addArtist(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
  ) {
    await this.favoritesService.addArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async removeArtist(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
  ) {
    await this.favoritesService.removeArtist(id);
  }
}
