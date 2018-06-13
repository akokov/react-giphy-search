import React, {Component} from 'react';
import {
    NavLink,
    Redirect,
    Route,
    Switch,
    withRouter
} from 'react-router-dom';
import RandomScene from '../scenes/Random/Random';
import HomeScene from '../scenes/Home/Home';
import {connect} from 'react-redux';
import Login from '../scenes/Login/Login';
import * as actions from './services/actions';
import * as authActions from '../scenes/Login/services/actions';
import {UserBar} from './components/UserBar/UserBar';
import FavouritesScene from '../scenes/Favourites/Favourites';

export class Main extends Component {

  componentDidMount() {
    this.props.onAppInit();
  }

  handleLogout = () => {
    this.props.onLogout();
  };

  render() {
    const {user, loggedIn, initializing, error} = this.props;

    if (error) {
      return <div>{error}</div>;
    }

    const pageName = this.props.location.pathname.substr(1).replace('/', '-');

    return (
    <React.Fragment>
      <div className="ui pointing menu">
          {initializing ? 'Loading!' : null}
        <div className='app-header__logo'>
          GIPHY Search | {pageName}
        </div>
        <NavLink to={'/random'} className="item">Random</NavLink>
        <NavLink to={'/home'}  className="item">Home</NavLink>

          {loggedIn ?
              <NavLink to={'/favourites'}  className="item">Favourites</NavLink> : null
          }

          {!loggedIn && !initializing ?
              <NavLink to={'/login'}  className="item">Login</NavLink> : null
          }
          {loggedIn ?
              <UserBar user={user} onLogout={this.handleLogout}/> : null
          }
      </div>
      <Switch>
        <Route exact path='/' component={RandomScene}/>
        <Route path={'/random'} component={RandomScene}/>
        <Route path={'/home'} component={HomeScene}/> : null

          {loggedIn ?
              <Route path={'/favourites'} component={FavouritesScene}/> : null
          }

          {!loggedIn && !initializing ?
              <Route path={'/login'} component={Login}/> : null
          }

        <Redirect to={'/random'}/>
      </Switch>
    </React.Fragment>
    );
  }

}

const mapStateToProps = (state) => {
  const {user, loggedIn} = state.auth;
  const {initializing, error} = state.main;

  return {
    user,
    loggedIn,
    initializing,
    error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAppInit: () => dispatch(actions.initApp()),
    onLogout: () => dispatch(authActions.logout())
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Main)
);