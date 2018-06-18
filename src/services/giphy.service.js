import * as queryString from 'qs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { constantsAPI } from './constants';

const URL_RANDOM = constantsAPI.giphy.giphyUrl + '/random';
const URL_SEARCH = constantsAPI.giphy.giphyUrl + '/search';

const apiGiphy = {

  search: (query) => {
    const params = queryString.stringify({
      key: constantsAPI.giphy.apiKey,
      api_key: constantsAPI.giphy.apiKey,
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
      key: constantsAPI.giphy.apiKey,
      api_key: constantsAPI.giphy.apiKey,
    });

    return ajax({
      url: `${URL_RANDOM}?${params}`,
      method: 'GET',
      responseType: 'json',
    })

  }
};

export default apiGiphy;