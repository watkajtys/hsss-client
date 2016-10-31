import {combineReducers} from 'redux';

//REDUCERS

import deckReducer from './deck-reducer';
import episodeReducer from './episode-reducer';
import headerReducer from './header-reducer';
import audioReducer from './audio-reducer';

//COMBINE REDUCERS

var reducers = combineReducers({
  slideState   : deckReducer,
  episodeState : episodeReducer,
  headerState  : headerReducer,
  audioState   : audioReducer
});

export default reducers;