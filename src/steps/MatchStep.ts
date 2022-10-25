import { BaseStep } from './BaseStep'
import { Return } from './Step'
import { ReturnItems } from './types'

export abstract class MatchStep extends BaseStep {
	public abstract return(...items: ReturnItems): Return
}
