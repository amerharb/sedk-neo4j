import { IStatementGiver } from './IStatementGiver'

export class Variable implements IStatementGiver{
	public constructor(public readonly name: string) {
	}

	public getStmt(): string {
		return this.name
	}
}
