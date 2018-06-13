import { combineEpics } from 'redux-observable';
import {
  interval,
  of
} from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  takeUntil
} from 'rxjs/operators';
import * as actions from './actions';

export const loadRandom = (
  action$,
  store,
  {apiGiphy}
) =>
  action$.ofType(actions.LOAD_RANDOM).pipe(
    mergeMap(
      action => {
        return apiGiphy.random().pipe(
          map(({response}) => {
            return actions.loadRandomSuccess(response.data);
          }),
          catchError(
            error => {
              return of(actions.loadRandomError('An error!'));
            }),
          takeUntil(action$.ofType(actions.LOAD_RANDOM_CANCEL, actions.STOP_TIMER))
        )
      })
  );

export const startTimer = (
  action$,
  store
) =>
  action$.ofType(actions.START_TIMER).pipe(
    switchMap(
      action => {
        return interval(5000).pipe(
          map(() => actions.loadRandom()),
          takeUntil(action$.ofType(actions.STOP_TIMER))
        );
      })
  );


export default combineEpics(
  loadRandom,
  startTimer
)