import * as types from '../actions/action-types';

const initialState = {
  visible : false
};

const headerReducer = function (state = initialState, action) {
  switch (action.type) {
    case types.HEADER_VISIBILITY :
      return Object.assign({}, state, {
        visible : action.visible
      });
  }
  return state;
};

export default headerReducer;