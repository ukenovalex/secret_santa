import { IsString } from 'class-validator';

export class WishSaveDto {
	user_id: string;
	@IsString()
	message: string;
}
