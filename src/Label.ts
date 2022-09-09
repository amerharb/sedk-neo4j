import { IStatementGiver } from './IStatementGiver'

export class Label implements IStatementGiver {
	public constructor(public readonly name: string) {
	}

	public getStmt(): string {
		return this.name
	}
}
