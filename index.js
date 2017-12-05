const { graphql, buildSchema } = require('graphql')

const schema = buildSchema(`
  type Query {
    id: ID
    title: String
    duration: Int
    watched: Boolean
  }

  type Schema {
    query: Query
  }
`)

const resolvers = {
  id: () => '1',
  title: () => 'title',
  duration: () => 180,
  watched: () => true,
}

const query = `
  query myFirstQuery {
    id
    title
    duration
    watched
  }
`

graphql(schema, query, resolvers)
  .then(console.log)
  .catch(console.log)
