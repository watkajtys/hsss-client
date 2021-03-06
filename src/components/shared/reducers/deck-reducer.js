import * as types from '../actions/action-types.js';

const initialState = {
  activeSlide     : '1',
  activeContainer : 'INTRO',
  lockedSide      : false,
  restart         : false
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
    case types.UPDATE_SLIDE_AND_CONTAINER :
      return Object.assign({}, state, {
        activeContainer : action.activeContainer,
        activeSlide     : action.activeSlide
      });
    case types.RESTART :
      return Object.assign({}, state, {
        restart         : action.restart,
        activeSlide     : '1',
        activeContainer : 'INTRO'
      });
  }
  return state;
};

export default deckReducer;