import * as types from '../actions/action-types';

const initialState = {
  episode    : '1',
  launchSide : 'SHE'
};

const episodeReducer = function (state = initialState, action) {
  switch (action.type) {
    case types.LAUNCH_EPISODE :
      return Object.assign({}, state, {
        episode    : action.episode,
        launchSide : action.launchSide
      })
  }
  return state;
};

export default episodeReducer;