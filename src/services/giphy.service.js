import * as queryString from 'qs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { constantsService } from './constants.service';

const URL_RANDOM = constantsService.giphy.giphyUrl + '/random';
const URL_SEARCH = constantsService.giphy.giphyUrl + '/search';

const apiGiphy = {

  search: (query) => {
    const params = queryString.stringify({
      key: constantsService.giphy.apiKey,
      api_key: constantsService.giphy.apiKey,
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
      key: constantsService.giphy.apiKey,
      api_key: constantsService.giphy.apiKey,
    });

    return ajax({
      url: `${URL_RANDOM}?${params}`,
      method: 'GET',
      responseType: 'json',
    })

  }
};

export default apiGiphy;