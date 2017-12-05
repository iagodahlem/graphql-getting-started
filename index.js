const express = require('express')
const graphqlHTTP = require('express-graphql')
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
} = require('graphql')
const { getVideoById } = require('./src/data')

const app = express()

const PORT = process.env.PORT || 3000

const videoType = new GraphQLObjectType({
  name: 'Video',
  description: 'A video',
  fields: {
    id: {
      type: GraphQLID,
      description: 'The ID of the video.'
    },
    title: {
      type: GraphQLString,
      description: 'The title of the video.'
    },
    duration: {
      type: GraphQLInt,
      description: 'The duration of the video in seconds.'
    },
    watched: {
      type: GraphQLBoolean,
      description: 'Whether or not a viewer has watched the video.'
    },
  },
})

const queryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'The root query type',
  fields: {
    video: {
      type: videoType,
      args: {
        id: {
          type: GraphQLID,
          description: 'The ID of the video.'
        },
      },
      resolve: (_, { id }) => getVideoById(id),
    },
  },
})

const schema = new GraphQLSchema({
  query: queryType,
})

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}))

app.get('/', (req, res) => res.send('Server is up.'))

app.listen(PORT, () => {
  console.log(`Server is up and running at localhost://${PORT}`)
})
