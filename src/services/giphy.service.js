import * as queryString from 'qs';
import { ajax } from 'rxjs/observable/dom/ajax';

const API_KEY = 'JokfEsQ6phaio2LlwNgGHhpBr47QE89e';
const GIPHY_URL = 'http://api.giphy.com/v1/gifs';
const URL_RANDOM = GIPHY_URL + '/random';
const URL_SEARCH = GIPHY_URL + '/search';

const apiGiphy = {

  search: (query) => {
    const params = queryString.stringify({
      key: API_KEY,
      api_key: API_KEY,
      q: query
    });

    return ajax({
      url: `${URL_SEARCH}?${params}`,
      method: 'GET',
      responseType: 'json',
    })

  },

  random: () => {
    // console.log('Load random received');
    const params = queryString.stringify({
      key: API_KEY,
      api_key: API_KEY,
    });

    return ajax({
      url: `${URL_RANDOM}?${params}`,
      method: 'GET',
      responseType: 'json',
    })

  }
};

export default apiGiphy;