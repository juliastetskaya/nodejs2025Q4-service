import { Module, forwardRef } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import InMemoryTracksStore, { TRACKS_STORE_TOKEN } from './tracks.store';
import { FavoritesModule } from '../favorites/favorites.module';

@Module({
  imports: [forwardRef(() => FavoritesModule)],
  providers: [
    TracksService,
    {
      provide: TRACKS_STORE_TOKEN,
      useClass: InMemoryTracksStore,
    },
  ],
  controllers: [TracksController],
  exports: [TRACKS_STORE_TOKEN],
})
export class TracksModule {}
