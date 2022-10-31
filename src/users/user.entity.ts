import { compare, hash } from 'bcryptjs';

export class User {
	private _password: string;

	constructor(
		private readonly _email: string,
		private readonly _name: string,
		private readonly _isSanta: boolean,
		private readonly _isHasSanta: boolean,
		passwordHash?: string,
	) {
		if (passwordHash) {
			this._password = passwordHash;
		}
	}

	get email(): string {
		return this._email;
	}

	get name(): string {
		return this._name;
	}

	get password(): string {
		return this._password;
	}

	get isSanta(): boolean {
		return this._isHasSanta;
	}

	get isHasSanta(): boolean {
		return this._isSanta;
	}

	public async setPassword(pass: string, salt: number): Promise<void> {
		this._password = await hash(pass, salt);
	}

	public async comparePassword(password: string): Promise<boolean> {
		return compare(password, this._password);
	}
}
