import { RESTDataSource } from 'apollo-datasource-rest';

export class MovieDBAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.themoviedb.org/3/';
  }

  willSendRequest(request) {
    request.params.set('api_key', '5d87429e4f4f5989cd5b90ca3ff1c320');
  }

  async discoverMovies() {
    return this.get('discover/movie');
  }
}
