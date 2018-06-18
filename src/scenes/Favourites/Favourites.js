import React, { Component } from 'react';
import {
  loadFavourites,
  loadFavouritesCancel
} from './services/actions';
import { GifItem } from '../../components/GifItem/GifItem';
import { connect } from 'react-redux';

export class FavouritesScene extends Component {

  componentDidMount() {
    this.props.onLoad();
  }

  componentWillUnmount() {
    this.props.onCancel();
  }

  render() {
    const {items, loading, error} = this.props;

    return (
      <div>
        <h1>Favourites</h1>
        <div>

          {loading ? 'Loading' : null}
          {error ? 'Error' : null}

          <div>
            {items && items.map(
              item => {
                return (
                  <GifItem url={item.image_original_url} alt={item.title}/>
                );
              })}
          </div>
        </div>
      </div>
    );

  }

}

const mapStateToProps = (state) => {
  const {items, loading, error} = state.favourites;

  return {
    loading,
    error,
    items
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoad: () => dispatch(loadFavourites()),
    onCancel: () => dispatch(loadFavouritesCancel())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FavouritesScene);

