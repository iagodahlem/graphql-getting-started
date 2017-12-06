const express = require('express')
const graphqlHTTP = require('express-graphql')
const routes = require('./src/routes')
const schema = require('./src/schema')

const app = express()

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
