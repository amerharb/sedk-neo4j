import { BaseStep } from './BaseStep'
import { Variable } from '../Variable'
import { Label } from '../Label'
import { MatchStep } from './MatchStep'
import { VarLabels } from './types'

export abstract class RootStep extends BaseStep {
	public abstract match(variable: Variable): MatchStep
	public abstract match(...Labels: Label[]): MatchStep
	public abstract match(...varLabels: VarLabels): MatchStep
}
