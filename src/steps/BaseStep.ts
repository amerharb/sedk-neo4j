export abstract class BaseStep {
	public constructor(protected readonly prevStep: BaseStep | null) {
	}

	public getCypher(): string {
		if (this.prevStep === null || this.prevStep.toString() === '') {
			return this.toString()
		}
		return `${this.prevStep.getCypher()} ${this.toString()}`
	}

	public abstract toString(): string
}
