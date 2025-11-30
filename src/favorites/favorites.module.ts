import { Module, forwardRef } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import InMemoryFavoritesStore, {
  FAVORITES_STORE_TOKEN,
} from './favorites.store';
import { ArtistsModule } from '../artists/artists.module';
import { AlbumsModule } from '../albums/albums.module';
import { TracksModule } from '../tracks/tracks.module';

@Module({
  imports: [
    forwardRef(() => ArtistsModule),
    forwardRef(() => AlbumsModule),
    forwardRef(() => TracksModule),
  ],
  providers: [
    FavoritesService,
    {
      provide: FAVORITES_STORE_TOKEN,
      useClass: InMemoryFavoritesStore,
    },
  ],
  controllers: [FavoritesController],
  exports: [FAVORITES_STORE_TOKEN],
})
export class FavoritesModule {}
