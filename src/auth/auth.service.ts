import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    // Inject Repository
    constructor(
        @InjectRepository(UserRepository)
        private userRepository : UserRepository,
        private jwtService : JwtService
    ){}

    //Sign up new user
    async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
        return this.userRepository.createUser(authCredentialDto);
    }
    
    //User sign in
    async signIn(authCredentialDto: AuthCredentialDto) : Promise<{accessToken : string}> {
        const {username, password} = authCredentialDto
        const user = await this.userRepository.findOneBy({username})

        //Login Success
        if (user && (await bcrypt.compare(password,user.password))) {
            const payload = {username}
            const accessToken = await this.jwtService.sign(payload)
            return {accessToken}
        } else { // Login Failed
            throw new UnauthorizedException("Login Failed")
        }
    }
}
