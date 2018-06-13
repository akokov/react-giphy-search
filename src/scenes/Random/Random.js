import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  loadRandom,
  loadRandomCancel,
  startTimer,
  stopTimer
} from './services/actions';
import './Random.css';
import { GifItem } from '../../components/GifItem/GifItem';
import '../../App.css';

class RandomScene extends Component {

  componentDidMount() {
    this.props.onLoad();
  }

  componentWillUnmount() {
    this.props.onCancel();
    if (this.props.timerStarted) {
      this.props.onSwitchTimer(false);
    }
  }

  handleLoadRandom = () => {
    this.props.onLoad();
  };

  handleStartTimer = () => {
    this.props.onSwitchTimer(!this.props.timerStarted);
  };

  render() {
    const {image, loading, error, timerStarted} = this.props;

    return (
      <div className='random-scene'>
        <ul className='app-header__navigation'>
          <li>
            <button
              className="load-random-btn ui primary button"
              onClick={this.handleLoadRandom}>
              Another please!
            </button>
          </li>
          <li>
            <button
              className="load-random-btn ui primary button"
              onClick={this.handleStartTimer}>
              {!timerStarted ? 'Start!' : 'Stop'}
            </button>
          </li>
          <li>
            {loading ? <div>Loading...</div> : null}
            {error ? <div>Error</div> : null}
          </li>
        </ul>


        <div className='random-img'>
          {image ?
            (loading ? null : <GifItem url={image.image_original_url} alt={image.title}/>)
            : 'Please, press load'
          }
          {image && image.username && !loading ?
            <span> @{image.username}</span>
            : null
          }
        </div>

      </div>
    );
  }

}

const mapStateToProps = (state) => {
  const {image, loading, error, timerStarted} = state.random;
  return {
    image,
    loading,
    error,
    timerStarted
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoad: () => dispatch(loadRandom()),
    onSwitchTimer: (doStart) => dispatch(doStart ? startTimer() : stopTimer()),
    onCancel: () => dispatch(loadRandomCancel())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RandomScene);