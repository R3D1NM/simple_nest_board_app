import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from 'src/entity/user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    //Sign up new user
    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialDto : AuthCredentialDto): Promise<void> {
        return this.authService.signUp(authCredentialDto)
    }

    //User sign in
    @Post('/signin')
    signIn(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto) : Promise<{accessToken: string}> {
        return this.authService.signIn(authCredentialDto)
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user: User){
        console.log(user);
    }
}
