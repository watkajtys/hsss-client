import {combineReducers} from 'redux';

//REDUCERS

import deckReducer from './deck-reducer';
import episodeReducer from './episode-reducer';
import headerReducer from './header-reducer';

//COMBINE REDUCERS

var reducers = combineReducers({
  slideState   : deckReducer,
  episodeState : episodeReducer,
  headerState  : headerReducer
});

export default reducers;