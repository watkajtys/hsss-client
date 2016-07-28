import {combineReducers} from 'redux';

//REDUCERS

import deckReducer from './deck-reducer';
import episodeReducer from './episode-reducer';

//COMBINE REDUCERS

var reducers = combineReducers({
  slideState : deckReducer,
  episodeState: episodeReducer
});

export default reducers;