import { Step } from './steps/Step'
import { RootStep } from './steps/RootStep'

export function builder(): RootStep {
	return new Step()
}
