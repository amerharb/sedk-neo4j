export abstract class BaseStep {
	public abstract cleanUp(): void
	public abstract getCypher(): string
}
