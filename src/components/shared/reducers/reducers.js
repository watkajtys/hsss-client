import {combineReducers} from 'redux';

//REDUCERS

import deckReducer from './deck-reducer';

//COMBINE REDUCERS

var reducers = combineReducers({
  slideState : deckReducer
});

export default reducers;