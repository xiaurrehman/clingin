import { IsNotEmpty, IsEmail } from "class-validator";

export class VerifyResetEmailDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    code: string;
}
