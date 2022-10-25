import { Root, Step } from './steps/Step'

export function builder(): Root {
	return new Step()
}
