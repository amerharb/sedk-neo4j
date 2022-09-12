import * as sedk from '../../src'
import { database } from '../database'
import * as fs from 'fs'

/** Aliases: they are used inside eval code */
const Person = database.Labels.Person
const Animal = database.Labels.Animal
const n = new sedk.Variable('n')
const x = new sedk.Variable('x')
const ASTERISK = sedk.ASTERISK

describe('eval', () => {
	const cypher = sedk.builder()
	afterEach(() => {
		cypher.cleanUp()
	})
	describe('tests.csv', () => {
		const file = fs.readFileSync('test/eval/tests.csv', 'utf8')
		const lines = file.split('\n')
		const codeCypherArray = unflatten(lines)
		codeCypherArray.forEach(line => {
			it(`Produce: [${line.cypher}] for: <${line.code}>`, () => {
				const actual = eval(line.code)
				expect(actual).toBe(line.cypher)
			})
		})
	})
})

type CodeCypher = { code: string, cypher: string }

function unflatten(lines: string[]): CodeCypher[] {
	const result: CodeCypher[] = []
	for (let i = 0; i < lines.length; i += 3) {
		result.push({ code: lines[i], cypher: lines[i + 1] })
	}
	return result
}
