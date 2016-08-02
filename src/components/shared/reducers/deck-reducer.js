import * as types from '../actions/action-types.js';

const initialState = {
  activeSlide     : 'D1',
  activeContainer : 'INTRO'
};

const deckReducer = function (state = initialState, action) {
  switch (action.type) {
    case types.CHANGE_SLIDE :
      return Object.assign({}, state, {
        activeSlide : action.activeSlide
      });
    case types.UPDATE_ACTIVE_CONTAINER :
      return Object.assign({}, state, {
        activeContainer : action.activeContainer
      })
  }
  return state;
};

export default deckReducer;