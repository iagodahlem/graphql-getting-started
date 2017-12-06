const express = require('express')
const graphqlHTTP = require('express-graphql')
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInputObjectType,
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

const nodeInterface = require('./src/node')

const routes = require('./src/routes')

const app = express()

const videoType = new GraphQLObjectType({
  name: 'Video',
  description: 'A video',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
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
  interfaces: [nodeInterface],
})

exports.videoType = videoType

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

const videoInputType = new GraphQLInputObjectType({
  name: 'VideoInput',
  fields: {
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
})

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'The root Mutation type.',
  fields: {
    createVideo: {
      type: videoType,
      args: {
        video: {
          type: new GraphQLNonNull(videoInputType),
        },
      },
      resolve: (_, { video }) => {
        return createVideo(video)
      },
    },
  },
})

const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
})

app.use('/', routes)

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}))

app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json('error')
})

module.exports = app
