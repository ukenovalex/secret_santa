import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsString({ message: 'Not pointed name' })
	name: string;

	@IsEmail({}, { message: 'Error email type' })
	email: string;

	@IsString({ message: 'Not pointed password' })
	password: string;
}
