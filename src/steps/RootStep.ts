import { BaseStep } from './BaseStep'
import { Variable } from '../Variable'
import { Label } from '../Label'
import { Match } from './Step'
import { VarLabels } from './types'

export abstract class RootStep extends BaseStep {
	public abstract match(variable: Variable): Match
	public abstract match(...Labels: Label[]): Match
	public abstract match(...varLabels: VarLabels): Match
}
