import { Donee } from './donee.entity';

export interface ISantaService {
	becomeSanta: (email: string) => Promise<Donee>;
	getDonee: (email: string) => Promise<Donee>;
}
