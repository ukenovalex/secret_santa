export class HTTPError extends Error {
	constructor(private _statusCode: number, message: string, private _context?: string) {
		super(message);
	}

	get statusCode(): number {
		return this._statusCode;
	}
	get context(): string | undefined {
		return this._context;
	}
}
