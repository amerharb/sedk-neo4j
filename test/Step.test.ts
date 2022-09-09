import * as sedk from '../src'
import { database } from './database'

// Aliases
const Person = database.Labels.Person
const Animal = database.Labels.Animal
const n = new sedk.Variable('n')
const ASTERISK = sedk.ASTERISK

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
		it('Produce: [MATCH (n:Person:Animal) RETURN *]', () => {
			const actual = cypher.match(n, Person, Animal).return(ASTERISK).getCypher()

			expect(actual).toBe('MATCH (n:Person:Animal) RETURN *')
		})
		it('Produce: [MATCH (n:Person:Animal) RETURN n, *]', () => {
			const actual = cypher.match(n, Person, Animal).return(n, ASTERISK).getCypher()

			expect(actual).toBe('MATCH (n:Person:Animal) RETURN n, *')
		})
		/** It is not valid cypher stmt but it is ok to get stmt before the end of chain */
		it('Produce: [MATCH (n:Person:Animal)]', () => {
			const actual = cypher.match(n, Person, Animal).getCypher()

			expect(actual).toBe('MATCH (n:Person:Animal)')
		})
	})

	describe('Throwing Errors', () => {
		it('Throws: No variable or labels provided (match)', () => {
			const actual = () => cypher.match()

			expect(actual).toThrow('No variable or labels provided')
		})
		it('Throws: No variable or labels provided (getCypher)', () => {
			const actual = () => cypher.getCypher()

			expect(actual).toThrow('No variable or labels provided')
		})
		it('Throws: At least one variable must be provided', () => {
			const actual = () => cypher.match(n).return()

			expect(actual).toThrow('At least one variable must be provided')
		})
	})
})
