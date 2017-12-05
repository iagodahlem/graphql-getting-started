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

const getVideoById = (id) => new Promise((resolve) => {
  const video = videos.find(video => {
    return video.id === id
  })

  resolve(video)
})

module.exports.getVideoById = getVideoById
