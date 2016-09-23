import * as types from '../actions/action-types.js';

const initialState = {
  activeSlide     : 'D1',
  activeContainer : 'INTRO',
  lockedSide      : false
};

const deckReducer = function (state = initialState, action) {
  switch (action.type) {
    case types.CHANGE_SLIDE :
      return Object.assign({}, state, {
        activeSlide  : action.activeSlide,
        activeParent : action.activeParent,
        lockedSide   : action.lockedSide
      });
    case types.UPDATE_ACTIVE_CONTAINER :
      return Object.assign({}, state, {
        activeContainer : action.activeContainer
      });
  }
  return state;
};

export default deckReducer;