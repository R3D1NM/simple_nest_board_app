import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from 'src/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config'

@Module({
  controllers: [AuthController],
  providers: [AuthService,UserRepository],
  imports: [TypeOrmModule.forFeature([User]),
  JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions:{
      expiresIn: 60*60
    }
  })
  ]
})
export class AuthModule {}
