import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from 'src/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';

@Module({
  controllers: [AuthController],
  providers: [AuthService,UserRepository],
  imports: [TypeOrmModule.forFeature([User])]
})
export class AuthModule {}
