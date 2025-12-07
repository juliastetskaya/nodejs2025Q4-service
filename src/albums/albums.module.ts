import { Module } from '@nestjs/common';
import { AlbumsController } from './albums.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AlbumsService } from './albums.service';

@Module({
  imports: [PrismaModule],
  controllers: [AlbumsController],
  providers: [AlbumsService],
})
export class AlbumsModule {}
