import * as sedk from '../src'
import { database } from './database'

// Aliases
const Person = database.Labels.Person
const Animal = database.Labels.Animal
const n = new sedk.Variable('n')

describe('Step', () => {
	const cypher = sedk.builder()
	afterEach(() => {
		cypher.cleanUp()
	})
	describe('simple Cypher', () => {
		it('Produce: [MATCH (n) RETURN n]', () => {
			const actual = cypher.match(n).return(n).getCypher()

			expect(actual).toBe('MATCH (n) RETURN n')
		})
		it('Produce: [MATCH (n) RETURN n, n]', () => {
			const actual = cypher.match(n).return(n, n).getCypher()

			expect(actual).toBe('MATCH (n) RETURN n, n')
		})
		it('Produce: [MATCH (n) RETURN n, n, n]', () => {
			const actual = cypher.match(n).return(n, n, n).getCypher()

			expect(actual).toBe('MATCH (n) RETURN n, n, n')
		})
		it('Produce: [MATCH (:Person) RETURN n]', () => {
			const actual = cypher.match(Person).return(n).getCypher()

			expect(actual).toBe('MATCH (:Person) RETURN n')
		})
		it('Produce: [MATCH (:Person:Animal) RETURN n]', () => {
			const actual = cypher.match(Person, Animal).return(n).getCypher()

			expect(actual).toBe('MATCH (:Person:Animal) RETURN n')
		})
		it('Produce: [MATCH (n:Person) RETURN n]', () => {
			const actual = cypher.match(n, Person).return(n).getCypher()

			expect(actual).toBe('MATCH (n:Person) RETURN n')
		})
		it('Produce: [MATCH (n:Person:Animal) RETURN n]', () => {
			const actual = cypher.match(n, Person, Animal).return(n).getCypher()

			expect(actual).toBe('MATCH (n:Person:Animal) RETURN n')
		})
	})

	describe('Throwing Errors', () => {
		it('Throws: ', () => {
			const actual = () => cypher.match()

			expect(actual).toThrow('No variable or labels provided')
		})
		it('Throws: ', () => {
			const actual = () => cypher.getCypher()

			expect(actual).toThrow('No variable or labels provided')
		})
	})
})
