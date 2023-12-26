import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialDto {
    @IsString() @MinLength(6) @MaxLength(20)
    username: string;

    @IsString() @MinLength(6) @MaxLength(20) 
    @Matches(/^[a-zA-Z0-9]*$/,{
        message: "password should be a combination of alphabets and numerals"
    })
    password: string;
}