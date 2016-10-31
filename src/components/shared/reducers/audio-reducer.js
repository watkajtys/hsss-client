import * as types from '../actions/action-types';

const initialState = {
  audioTrack   : '',
  audioPlaying : true
};

const audioReducer = function (state = initialState, action) {
  switch (action.type) {
    case types.RUN_AUDIO :
      return Object.assign({}, state, {
        audioTrack   : action.audioTrack,
        audioPlaying : action.audioPlaying
      })
  }
  return state;
};

export default audioReducer;