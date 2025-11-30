import type { Track } from './track.interface';
import type { CreateTrackDto } from '../dto/create-track.dto';
import type { UpdateTrackDto } from '../dto/update-track.dto';

export interface TracksStore {
  getAllTracks(): Track[];
  getTrackById(id: string): Track;
  create(track: CreateTrackDto): Track;
  update(id: string, data: UpdateTrackDto): Track;
  delete(id: string): void;
}
