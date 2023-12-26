import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    // Inject Repository
    constructor(
        @InjectRepository(UserRepository)
        private userRepository : UserRepository
    ){}
}
