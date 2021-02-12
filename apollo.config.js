module.exports = {
  client: {
    includes: ["./src/**/*.{tsx,ts}"],
    tagname: "gql",
    service: {
      name: "podcast-backend",
      //url: "https://nuber-eats-yjs-backend.herokuapp.com/graphql"
      //url: "https://7ytk5.sse.codesandbox.io/graphql"
      url: "http://localhost:4000/graphql"
    }
  }
};
