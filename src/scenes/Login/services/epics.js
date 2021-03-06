import { combineEpics } from 'redux-observable';
import { of } from 'rxjs';
import {
  catchError,
  map,
  switchMap
} from 'rxjs/operators';
import * as actions from './actions';

export const login = (
  action$,
  store,
  {apiAuth}
) =>
  action$.ofType(actions.LOGIN).pipe(
    switchMap(
      action => {
        const {username, password} = action.payload;

        return apiAuth.login(username, password)
          .pipe(
            map(
              response => {
                const {email, uid} = response.user;
                return actions.loginSuccess(
                  {
                    email,
                    uid
                  }
                );
              }),
            catchError(
              error => {
                return of(actions.loginError('An error!'));
              })
          );
      })
  );

export const logout = (
  action$,
  store,
  {apiAuth}
) =>
  action$.ofType(actions.LOGOUT).pipe(
    switchMap(
      action => {
        return apiAuth.logout()
          .pipe(
            map(
              response => {
                return actions.logoutSuccess();
              }),
            catchError(
              error => {
                return of(actions.logoutError('An error!'));
              })
          );
      })
  );


export default combineEpics(
  login,
  logout
)