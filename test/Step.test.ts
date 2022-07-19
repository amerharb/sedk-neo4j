import * as sedk from '../src'
import { database } from './database'

describe('simple Cypher', () => {
  const cypher = new sedk.Step()
  afterEach(() => {
    cypher.cleanUp()
  })
  it('Produce: [MATCH (n:Person) RETURN n]', () => {
    const actual = cypher.match([database.Labels.Person]).return().getCypher()

    expect(actual).toBe('MATCH (n:Person) RETURN n')
  })
  it('Produce: [MATCH (n:Person:Animal) RETURN n]', () => {
    const labels = [database.Labels.Person, database.Labels.Animal]
    const actual = cypher.match(labels).return().getCypher()

    expect(actual).toBe('MATCH (n:Person:Animal) RETURN n')
  })
})
