const express = require('express')
const graphqlHTTP = require('express-graphql')
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
} = require('graphql')
const {
  getVideoById,
  getVideos,
  createVideo,
} = require('./src/data')

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
      description: 'The duration of the video (in seconds).'
    },
    released: {
      type: GraphQLBoolean,
      description: 'Whether or not the video has been released.'
    },
  },
})

const queryType = new GraphQLObjectType({
  name: 'Query',
  description: 'The root Query type.',
  fields: {
    videos: {
      type: new GraphQLList(videoType),
      resolve: getVideos,
    },
    video: {
      type: videoType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
          description: 'The ID of the video.'
        },
      },
      resolve: (_, { id }) => {
        return getVideoById(id)
      },
    },
  },
})

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'The root Mutation type.',
  fields: {
    createVideo: {
      type: videoType,
      args: {
        title: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'The title of the video.'
        },
        duration: {
          type: new GraphQLNonNull(GraphQLInt),
          description: 'The duration of the video (in seconds).'
        },
        released: {
          type: new GraphQLNonNull(GraphQLBoolean),
          description: 'Whether or not the video has been released.'
        },
      },
      resolve: (_, args) => {
        return createVideo(args)
      },
    },
  },
})

const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
})

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}))

app.get('/', (req, res) => res.send('Server is up.'))

app.listen(PORT, () => {
  console.log(`Server is up and running at localhost://${PORT}`)
})
