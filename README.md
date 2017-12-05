# graphql-getting-started

Studying GraphQL.

## Install

Simple run `yarn`.

## Running

For development run `yarn dev`, then visit [localhost:3000/graphql](http://localhost:3000/graphql).

Or for productoin run `yarn start`.

## Queries

#### Get video by id

```js
{
  video(id: "a") {
    id
    title
    duration
    released
  }
}
```

#### Get videos

```js
{
  videos {
    id
    title
    duration
    released
  }
}
```

## Mutations

#### Create video

```js
mutation M {
  createVideo(video: {
    title: "Foo Video"
    duration: 400
    released: false
  }) {
    id
    title
  }
}
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

[MIT License](http://iagodahlem.mit-license.org/) © Iago Dahlem
