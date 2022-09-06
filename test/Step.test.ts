import * as sedk from '../src'
import { database } from './database'

// Aliases
const Person = database.Labels.Person
const Animal = database.Labels.Animal

describe('simple Cypher', () => {
	const cypher = new sedk.Step()
	afterEach(() => {
		cypher.cleanUp()
	})
	it('Produce: [MATCH (n) RETURN n]', () => {
		const actual = cypher.match().return().getCypher()

		expect(actual).toBe('MATCH (n) RETURN n')
	})
	it('Produce: [MATCH (n:Person) RETURN n]', () => {
		const actual = cypher.match(database.Labels.Person).return().getCypher()

		expect(actual).toBe('MATCH (n:Person) RETURN n')
	})
	it('Produce: [MATCH (n:Person:Animal) RETURN n]', () => {
		const actual = cypher.match(Person, Animal).return().getCypher()

		expect(actual).toBe('MATCH (n:Person:Animal) RETURN n')
	})
})
