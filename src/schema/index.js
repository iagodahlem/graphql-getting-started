const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
} = require('graphql')
const {
  getVideoById,
  getVideos,
  createVideo,
} = require('../data')
const videoType = require('./types/videoType')
const videoInputType = require('./types/videoInputType')

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
          description: 'The ID of the video.',
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

module.exports = schema
