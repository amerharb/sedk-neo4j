export class Step implements Match, Return{
  private matchLabels: string[] = []

  public match(labels: string[]): Match {
    this.matchLabels.push(...labels)
    return this
  }

  public return(): Return {
    return this
  }

  public getCypher(): string {
    return `MATCH (n:${this.matchLabels.join(':')}) RETURN n`
  }
}

export interface Match {
    return(): Return
}

export interface Return {
    getCypher(): string
}