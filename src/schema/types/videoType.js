const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
} = require('graphql')
const nodeInterface = require('../interfaces/nodeInterface')

const videoType = new GraphQLObjectType({
  name: 'Video',
  description: 'A video',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The ID of the video.',
    },
    title: {
      type: GraphQLString,
      description: 'The title of the video.',
    },
    duration: {
      type: GraphQLInt,
      description: 'The duration of the video (in seconds).',
    },
    released: {
      type: GraphQLBoolean,
      description: 'Whether or not the video has been released.',
    },
  },
  interfaces: [nodeInterface],
})

module.exports = videoType
