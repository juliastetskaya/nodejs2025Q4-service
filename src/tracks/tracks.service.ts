import { Inject, Injectable } from '@nestjs/common';

import { TRACKS_STORE_TOKEN } from './tracks.store';
import { TracksStore } from './interfaces/tracks-store.interface';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TracksService {
  constructor(
    @Inject(TRACKS_STORE_TOKEN) private readonly tracksStore: TracksStore,
  ) {}

  getAll() {
    return this.tracksStore.getAllTracks();
  }

  create(track: CreateTrackDto) {
    return this.tracksStore.create(track);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    return this.tracksStore.update(id, updateTrackDto);
  }

  getById(id: string) {
    return this.tracksStore.getTrackById(id);
  }

  delete(id: string) {
    return this.tracksStore.delete(id);
  }
}
