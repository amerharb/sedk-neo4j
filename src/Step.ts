import { Label } from './Label'
import { Variable } from './Variable'

type VarLabels = [(Variable | Label)?, ...Label[]]

export class Step implements Root, Match, Return {
	private matchParts: VarLabels = []
	private returnParts: Variable[] = []

	public match(variable: Variable): Match
	public match(...Labels: Label[]): Match
	public match(...varLabels: VarLabels): Match
	public match(...varLabels: VarLabels): Match {
		if (varLabels.length === 0) {
			throw new Error('No variable or labels provided')
		}
		this.matchParts.push(...varLabels)
		return this
	}

	public return(...variables: Variable[]): Return {
		if (variables.length === 0) {
			throw new Error('At least one variable must be provided')
		}
		this.returnParts.push(...variables)
		return this
	}

	public getCypher(): string {
		const first = this.matchParts[0]
		if (first === undefined) {
			throw new Error('No variable or labels provided')
		}

		const matchArray = (first instanceof Variable)
			? [first.name, ...this.matchParts.slice(1).map(label => `${label?.name}`)]
			: ['', ...this.matchParts.map(label => `${label?.name}`)]

		return `MATCH (${matchArray.join(':')}) RETURN ${this.returnParts.map(it => it.name).join(', ')}`
	}

	public cleanUp(): void {
		this.matchParts.length = 0
		this.returnParts.length = 0
	}
}

export interface Match extends BaseStep {
	return(...variables: Variable[]): Return
}

export interface Return extends BaseStep {
	getCypher(): string
}

export interface Root extends BaseStep {
	match(variable: Variable): Match
	match(...Labels: Label[]): Match
	match(...varLabels: VarLabels): Match
}

export interface BaseStep {
	cleanUp(): void
	getCypher(): string
}
