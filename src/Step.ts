import { Label } from './Label'
import { Variable } from './Variable'
import { Asterisk } from './singletoneConstants'

type VarLabels = [(Variable | Label), ...Label[]]
type ReturnItems = Variable[] | [...Variable[], Asterisk]

export class Step implements Root, Match, Return {
	private matchItems?: VarLabels
	private returnItems?: ReturnItems

	public match(variable: Variable): Match
	public match(...Labels: Label[]): Match
	public match(...varLabels: VarLabels): Match
	public match(...varLabels: VarLabels): Match {
		if (varLabels.length === 0) {
			throw new Error('No variable or labels provided')
		}
		this.matchItems = [...varLabels]
		return this
	}

	public return(...items: ReturnItems): Return {
		if (items.length === 0) {
			throw new Error('At least one variable must be provided')
		}
		this.returnItems = [...items]
		return this
	}

	public getCypher(): string {
		if (this.matchItems === undefined || this.matchItems.length === 0) {
			throw new Error('No variable or labels provided')
		}

		const matchArray = (this.matchItems[0] instanceof Variable)
			? this.matchItems.map(it => it.getStmt())
			: ['', ...this.matchItems.map(it => it.getStmt())]

		let cypher = `MATCH (${matchArray.join(':')})`
		if (this.returnItems !== undefined && this.returnItems.length > 0) {
			cypher += ` RETURN ${this.returnItems.map(it => it.getStmt()).join(', ')}`
		}
		return cypher
	}

	public cleanUp(): void {
		this.matchItems = undefined
		this.returnItems = undefined
	}
}

export interface Match extends BaseStep {
	return(...items: ReturnItems): Return
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
