module.exports = {
  client: {
    includes: ["./src/**/*.{tsx,ts}"],
    tagname: "gql",
    service: {
      name: "podcast-backend",
      //url: "https://7ytk5.sse.codesandbox.io/graphql"
      url:
          process.env.NODE_ENV === "production"
              ? "https://spotify-clone-backend.herokuapp.com/graphql"
              : "http://localhost:4000/graphql",
    }
  }
};
