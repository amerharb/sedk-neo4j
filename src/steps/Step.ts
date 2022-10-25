import { Label } from '../Label'
import { Variable } from '../Variable'
import { Asterisk } from '../singletoneConstants'
import { VarLabels, ReturnItems } from './types'

export class Step {
	private matchItems?: VarLabels
	private returnItems?: ReturnItems

	public match(variable: Variable): Step
	public match(...Labels: Label[]): Step
	public match(...varLabels: VarLabels): Step
	public match(...varLabels: VarLabels): Step {
		if (varLabels.length === 0) {
			throw new Error('No variable or labels provided')
		}
		this.matchItems = [...varLabels]
		return this
	}

	public return(...items: ReturnItems): Step {
		checkItemsIsNotEmpty()
		checkItemsAreNotDuplicated()
		checkAsteriskIsLast()
		checkItemsExistInReturn(this.matchItems)
		checkThereIsVariableForAsterisk(this.matchItems)
		this.returnItems = [...items]
		return this

		function checkItemsIsNotEmpty() {
			if (items.length === 0) {
				throw new Error('At least one variable must be provided')
			}
		}

		function checkItemsAreNotDuplicated() {
			const itemsSet = new Set(items)
			if (items.length !== itemsSet.size) {
				throw new Error('Return item duplicated')
			}
		}

		function checkAsteriskIsLast() {
			if (items.find((item, index) => item instanceof Asterisk && index !== items.length - 1)) {
				throw new Error('Asterisk must be the last item')
			}
		}

		function checkItemsExistInReturn(matchItems?: VarLabels) {
			if (!items
				.filter(it => it instanceof Variable)
				.every(item => matchItems?.some(findItem => findItem === item))) {
				throw new Error('One or more variables are not in the match clause')
			}
		}

		function checkThereIsVariableForAsterisk(matchItems?: VarLabels) {
			if (
				items[items.length - 1] instanceof Asterisk
				&& !matchItems?.some(it => it instanceof Variable)
			) {
				throw new Error('RETURN ASTERISK is not allowed when there are no variables')
			}
		}
	}

	public getCypher(): string {
		if (this.matchItems === undefined || this.matchItems.length === 0) {
			throw new Error('No variable or labels provided')
		}

		const matchArray = this.matchItems.map(it => it.getStmt())
		if (!(this.matchItems[0] instanceof Variable)) {
			matchArray.unshift('')
		}

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

