import * as sedk from '../src'

describe('simple Cypher', () => {
  const cypher = new sedk.Step()
  it('Produce: [MATCH (n:Person) RETURN n]', () => {
    const actual = cypher.match(['Person']).return().getCypher()

    expect(actual).toBe('MATCH (n:Person) RETURN n')
  })
  it('Produce: [MATCH (n:Person:Animal) RETURN n]', () => {
    const actual = cypher.match(['Person', 'Animal']).return().getCypher()

    expect(actual).toBe('MATCH (n:Person:Animal) RETURN n')
  })
})
