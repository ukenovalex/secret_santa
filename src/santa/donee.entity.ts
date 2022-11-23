export class Donee {
	constructor(private readonly _name: string, private readonly _wishes: string[]) {}

	get name() {
		return this._name;
	}
	get wishes() {
		return this._wishes;
	}
}
