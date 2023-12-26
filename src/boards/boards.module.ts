import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from 'src/entity/board.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [BoardsController],
  providers: [BoardsService,BoardRepository],
  imports: [TypeOrmModule.forFeature([Board]), AuthModule]
})
export class BoardsModule {}
