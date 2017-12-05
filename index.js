const express = require('express')
const graphqlHTTP = require('express-graphql')
const { graphql, buildSchema } = require('graphql')
const app = express()

const PORT = process.env.PORT || 3000

const schema = buildSchema(`
  type Video {
    id: ID
    title: String
    duration: Int
    watched: Boolean
  }

  type Query {
    video: Video
    videos: [Video]
  }

  type Schema {
    query: Query
  }
`)

const videoA = {
  id: 'a',
  title: 'Create a GraphQL Schema',
  duration: 120,
  watched: true,
}

const videoB = {
  id: 'b',
  title: 'React',
  duration: 240,
  watched: false,
}

const videos = [videoA, videoB]

const resolvers = {
  video: () => ({
    id: '1',
    title: 'title',
    duration: 180,
    watched: true,
  }),
  videos: () => videos,
}

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: resolvers,
  graphiql: true,
}))

app.get('/', (req, res) => res.send('Server is up.'))

app.listen(PORT, () => {
  console.log(`Server is up and running at localhost://${PORT}`)
})
