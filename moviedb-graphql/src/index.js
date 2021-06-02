const { ApolloServer, gql } = require('apollo-server');
const { MovieDBAPI } = require('./datasource');
 
const typeDefs = gql`
  type Query {
    discover_movies(input: DiscoverMoviesParams): DiscoverMovies
  },
  input DiscoverMoviesParams {
    page: Int
  }
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
    discover_movies: (parents, args, context, info) => context.dataSources.movieDBAPI.discoverMovies(args.page),
  },
  Movie: {
    poster_path: (parents, args, context, info) => "https://image.tmdb.org/t/p/w500" + parents.poster_path
  }
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

