import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import InMemoryArtistsStore, { ARTISTS_STORE_TOKEN } from './artists.store';
import { TracksModule } from '../tracks/tracks.module';

@Module({
  imports: [TracksModule],
  providers: [
    ArtistsService,
    {
      provide: ARTISTS_STORE_TOKEN,
      useClass: InMemoryArtistsStore,
    },
  ],
  controllers: [ArtistsController],
})
export class ArtistsModule {}
