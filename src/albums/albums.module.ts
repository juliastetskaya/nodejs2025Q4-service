import { Module, forwardRef } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import InMemoryAlbumsStore, { ALBUMS_STORE_TOKEN } from './albums.store';
import { TracksModule } from '../tracks/tracks.module';
import { FavoritesModule } from '../favorites/favorites.module';

@Module({
  imports: [forwardRef(() => TracksModule), forwardRef(() => FavoritesModule)],
  providers: [
    AlbumsService,
    {
      provide: ALBUMS_STORE_TOKEN,
      useClass: InMemoryAlbumsStore,
    },
  ],
  controllers: [AlbumsController],
  exports: [ALBUMS_STORE_TOKEN],
})
export class AlbumsModule {}
