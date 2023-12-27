import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from 'src/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config'
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import * as config from 'config'

const JWTConfig = config.get('jwt')

@Module({
  controllers: [AuthController],
  providers: [AuthService,UserRepository, JwtStrategy],
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions:{
        expiresIn: JWTConfig.expiresIn
      }
    })
  ],
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}
