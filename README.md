# SEDK-neo4j
![Version](https://img.shields.io/badge/version-0.0.3-blue.svg)
[![License: GPLv3](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Coverage Status](https://codecov.io/gh/amerharb/sedk-neo4j/branch/main/graph/badge.svg)](https://codecov.io/gh/amerharb/sedk-neo4j)

SEDK-neo4j is a Cypher builder library for Neo4j, support binding parameters, and use a pre-defined Label and Relation

```typescript
const database = {
  Labels: {
    Person: new Label('Person'),
    Animal: new Label('Animal'),
  }
}

const actual = cypher.match(database.Labels.Person).return().getCypher()
// MATCH (:Person) RETURN n
```
### DISCLAIMER
THIS IS STILL A WORK IN PROGRESS FOR PROF OF CONCEPT PROJECT
USE IT FOR EDUCATION PURPOSE ONLY
