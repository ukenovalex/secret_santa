export class Wish {
	constructor(private readonly _message: string, private readonly _authorId: number) {}

	get message(): string {
		return this._message;
	}
	get authorId(): number {
		return this._authorId;
	}
}
