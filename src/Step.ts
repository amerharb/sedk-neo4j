import { Label } from './Label'

export class Step implements Match, Return {
	private matchLabels: Label[] = []

	public match(...labels: Label[]): Match {
		this.matchLabels.push(...labels)
		return this
	}

	public return(): Return {
		return this
	}

	public getCypher(): string {
		const matchArray = ['n', ...this.matchLabels.map(label => `${label.name}`)]
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
