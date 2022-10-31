import { IsString } from 'class-validator';

export class WishSaveDto {
	@IsString()
	message: string;
}
