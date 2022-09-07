# SEDK-neo4j
![Version](https://img.shields.io/badge/version-0.0.3-blue.svg)
[![License: GPLv3](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Coverage Status](https://codecov.io/gh/amerharb/sedk-neo4j/branch/main/graph/badge.svg)](https://codecov.io/gh/amerharb/sedk-neo4j)

SEDK-neo4j is a Cypher builder library for Neo4j, support binding parameters, and use a pre-defined Label and Relation

```typescript
import * as sedk from 'sedk-neo4j'

const database = {
  Labels: {
    Person: new sedk.Label('Person'),
    Animal: new sedk.Label('Animal'),
  }
}

//Aliases
const Person = database.Labels.Person
const Animal = database.Labels.Animal

const n = new sedk.Variable('n')
const cypher = sedk.builder()

const stmt = cypher.match(n, Person).return(n).getCypher()
// MATCH (n:Person) RETURN n
```

## Steps Rail Road
![SEDK steps](https://raw.githubusercontent.com/amerharb/sedk-neo4j/main/doc/StepsRailRoad.svg)

### DISCLAIMER
THIS IS STILL A WORK IN PROGRESS FOR PROF OF CONCEPT PROJECT
USE IT FOR EDUCATION PURPOSE ONLY
