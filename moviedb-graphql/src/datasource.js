const { RESTDataSource } = require('apollo-datasource-rest');

class MovieDBAPI extends RESTDataSource {
  #page = 1;
  constructor() {
    super();
    this.baseURL = 'https://api.themoviedb.org/3/';
  }

  willSendRequest(request) {
    request.params.set('page', this.page);
    request.params.set('api_key', '5d87429e4f4f5989cd5b90ca3ff1c320');
  }

  async discoverMovies(page) {
    this.page = page;
    return this.get('discover/movie');
  }
}

module.exports = { MovieDBAPI };

