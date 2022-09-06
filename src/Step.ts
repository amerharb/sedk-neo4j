import { Label } from './Label'
import { Variable } from './Variable'

type VarLabels = [(Variable | Label)?, ...Label[]]

export class Step implements Match, Return {
	private matchLabels: VarLabels = []

	public match(variable: Variable): Match
	public match(...Labels: Label[]): Match
	public match(...varLabels: VarLabels): Match {
		if (varLabels.length === 0) {
			throw new Error('No variable or labels provided')
		}
		this.matchLabels.push(...varLabels)
		return this
	}

	public return(): Return {
		return this
	}

	public getCypher(): string {
		const first = this.matchLabels[0]
		if (first === undefined) {
			throw new Error('No variable or labels provided')
		}

		const matchArray = (first instanceof Variable)
			? [first.name, ...this.matchLabels.slice(1).map(label => `${label?.name}`)]
			: ['', ...this.matchLabels.map(label => `${label?.name}`)]

		return `MATCH (${matchArray.join(':')}) RETURN n`
	}

	public cleanUp(): void {
		this.matchLabels.length = 0
	}
}

export interface Match {
	return(): Return
}

export interface Return {
	getCypher(): string
}
