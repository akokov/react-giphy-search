import { combineEpics } from 'redux-observable';
import { of } from 'rxjs';
import {
  catchError,
  map,
  mergeMap
} from 'rxjs/operators';
import * as actions from './actions';

export const loadFavorite = (
  action$,
  store,
  {apiFirebase}
) =>
  action$.ofType(actions.LOAD_FAVOURITES).pipe(
    mergeMap(
      action => {
        return apiFirebase.getFavorites().pipe(
          map(({response}) => {
            return actions.loadFavouritesSuccess(response.data);
          }),
          catchError(
            error => {
              return of(actions.loadFavouritesError('An error!'));
            }),
          takeUntil(action$.ofType(actions.LOAD_FAVOURITES_CANCEL))
        )
      })
  );

export default combineEpics(
  loadFavorite,
)