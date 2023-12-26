import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { User } from "src/entity/user.entity";
import { DataSource, Repository } from "typeorm";
import { AuthCredentialDto } from "./dto/auth-credential.dto";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(private dataSource : DataSource){
        super(User, dataSource.createEntityManager())
    }

    async createUser(authCredentialDto:AuthCredentialDto) : Promise<void> {
        const {username, password} = authCredentialDto
        const salt = await bcrypt.genSalt()
        const hashed = await bcrypt.hash(password,salt)

        const user = this.create({username,password:hashed})
        try {
            await this.save(user);
        } catch (error) {
            if(error.code==='23505'){
                throw new ConflictException('username already exists')
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

}