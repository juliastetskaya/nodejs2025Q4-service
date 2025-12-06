import { Injectable } from '@nestjs/common';
import { v4 as uuidv4, validate } from 'uuid';

import { TracksStore } from './interfaces/tracks-store.interface';
import { Track } from './interfaces/track.interface';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

export const TRACKS_STORE_TOKEN = 'TRACKS_STORE';

@Injectable()
class InMemoryTracksStore implements TracksStore {
  private tracks: Track[] = [];

  constructor() {
    this.tracks = [];
  }

  getAllTracks(): Track[] {
    return this.tracks;
  }

  getTrackById(id: string): Track {
    if (!validate(id)) {
      throw new Error('Invalid id');
    }

    const track = this.tracks.find((track) => track.id === id);

    if (!track) {
      throw new Error('Track not found');
    }

    return track;
  }

  create(track: CreateTrackDto): Track {
    const newTrack = {
      ...track,
      id: uuidv4(),
    };

    this.tracks.push(newTrack);

    return newTrack;
  }

  update(id: string, data: UpdateTrackDto): Track {
    if (!validate(id)) {
      throw new Error('Invalid id');
    }

    const track = this.tracks.find((track) => track.id === id);

    if (!track) {
      throw new Error('Track not found');
    }

    Object.assign(track, data);
    this.tracks = this.tracks.map((t) => (t.id === id ? track : t));

    return track;
  }

  delete(id: string): void {
    if (!validate(id)) {
      throw new Error('Invalid id');
    }

    const track = this.tracks.find((track) => track.id === id);

    if (!track) {
      throw new Error('Track not found');
    }

    this.tracks = this.tracks.filter((track) => track.id !== id);
  }
}

export default InMemoryTracksStore;
