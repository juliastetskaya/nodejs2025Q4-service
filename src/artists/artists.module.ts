import { Module, forwardRef } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import InMemoryArtistsStore, { ARTISTS_STORE_TOKEN } from './artists.store';
import { TracksModule } from '../tracks/tracks.module';
import { AlbumsModule } from '../albums/albums.module';
import { FavoritesModule } from '../favorites/favorites.module';

@Module({
  imports: [
    forwardRef(() => TracksModule),
    forwardRef(() => AlbumsModule),
    forwardRef(() => FavoritesModule),
  ],
  providers: [
    ArtistsService,
    {
      provide: ARTISTS_STORE_TOKEN,
      useClass: InMemoryArtistsStore,
    },
  ],
  controllers: [ArtistsController],
  exports: [ARTISTS_STORE_TOKEN],
})
export class ArtistsModule {}
