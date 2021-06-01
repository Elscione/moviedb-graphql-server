const { ApolloServer, gql } = require('apollo-server');
const { MovieDBAPI } = require('./datasource');
 
const typeDefs = gql`
  type Query {
    discover_movies: DiscoverMovies
  },
  type DiscoverMovies {
  	page: Int
  	results: [Movie]
  	total_pages: Int
  	total_results: Int
  }
  type Movie {
  	adult: Boolean
  	backdrop_path: String
  	genre_ids: [Int]
  	id: Int
  	original_language: String
  	original_title: String
  	overview: String
  	popularity: Float
  	poster_path: String
  	release_date: String
  	title: String
  	video: Boolean
  	vote_average: Float
  	vote_count: Int
  }
`;

const resolvers = {
  Query: {
    discover_movies: (root, {}, { dataSources }) => dataSources.movieDBAPI.discoverMovies(),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    movieDBAPI: new MovieDBAPI()
  })
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

