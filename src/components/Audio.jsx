import React from 'react';
import store from './shared/store';
require('../css/audio.css');
let _                      = require('lodash');
var hisAudioForImpressions = require('../audio/First_Impressions_He_ALT_1-2.mp3');
var herAudioForImpressions = require('../audio/First_Impressions_She_ALT_1-2.mp3');
var hisCuddleRoom          = require('../audio/Cuddle_Room_He_ALT_1-2.mp3');
var herCuddleRoom          = require('../audio/Cuddle_Room_She_ALT_1-2.mp3');
var hisNumberExchange      = require('../audio/Number_Exchange_He_ALT_1-2.mp3');
var herNumberExchange      = require('../audio/Number_Exchange_She_ALT_1-2.mp3');
var hisNightCap            = require('../audio/Night_Cap_He_ALT_1-2.mp3');
var herNightCap            = require('../audio/Night_Cap_She_ALT_1-2.mp3');
var nextOn                 = require('../audio/NextOn.mp3');
let classNames             = require('classnames');
import Waveform from './shared/waveform';
import {connect} from 'react-redux';

const Audio = React.createClass({

  getInitialState: function () {
    return {
      playing: false,
      finished: false,
      pos: 0,
      elapsed: '0:00'
    }
  },

  componentWillMount: function () {
    this.id = _.uniqueId('audio_');
  },

  componentDidMount : function () {
    //CHECK IF FIRST MOUNT
    if (!this.props.audioTrack && this.props.active) {
      //FIRST LOAD OF AUDIO SO PLAY
      this.setState({launch: true});
      const playAction = {
        type         : 'RUN_AUDIO',
        audioTrack   : this.props.file
      };
      store.dispatch(playAction);
    }

  },
  componentWillReceiveProps(nextProps) {

    if (!this.props.active && nextProps.active) {
      //IF AUDIO ISNT ACTIVE BUT IT ABOUT TO BE
      if (this.props.file == nextProps.audioTrack && !this.state.playing) {
        this.play();
      }
    } else if (this.props.active && !nextProps.active){
      //IF IT'S ACTIVE, BUT IT'S CHANGING
      console.log('PREV ACTIVE', this.props.file);
      // this.stop();
      if (this.props.file !== nextProps.audioTrack && this.state.playing) {
        this.stop();
      }
    }

    if (!this.props.active && (this.props.file !== nextProps.audioTrack)) {
      //IF WERE NOT ACTIVE BUT THE AUDIO FILE CHANGES
      if (this.state.playing) {
        //IF ITS PLAYING STOP IT
        console.log('stoped from not active')
        this.stop();
      }
    }

  },
  audioClass: function () {
    let extra = this.props.classExtra ? this.props.classExtra : '';
    return 'audio-container ' + extra;
  },

  handleTogglePlay: function () {


    if (this.state.finished) {
      this.setState({
        finished: false
      });

      this.play();


    } else {
      //   console.log('Toggle Play CALLED')
      // this.setState({
      //   playing: !this.state.playing
      // });
      // playAction.audioPlaying = !this.state.playing;
      if (this.props.active) {
       if (this.state.playing) {
         this.stop()
       } else {
         this.play()
       }
      }

    }
  },

  play : function() {
    if (this.state.ready) {
      const playAction = {
        type         : 'RUN_AUDIO',
        audioTrack   : this.props.file
      };
      this.setState({
        playing: true
      });
      store.dispatch(playAction);
    } else {
      this.setState({launch: true});
    }
  },

  stop : function() {
    if (this.state.ready) {
      const stopAction = {
        type         : 'RUN_AUDIO',
        audioTrack   : this.props.file
      };
      console.log('STOP CALLED', this.props.file)
      this.setState({
        playing: false
      });
      store.dispatch(stopAction);
    }

  },

  handleFinish() {
    console.log('HANDLE FINISH');
    const action = {
      type: 'CHANGE_SLIDE',
      activeSlide: this.props.nextSlide
    };
    store.dispatch(action);
  },

  handlePosChange(e) {
    this.setState({
      pos: e.originalArgs ? e.originalArgs[0] : +e.target.value,
      elapsed: e.originalArgs ? e.originalArgs[1] : '0:00'
    });
  },

  isReady() {
    this.setState({ready: true});
  },

  handlePlayChange(e) {
    if (e.playArgs) {
      this.setState({
        finished : e.playArgs[0],
        playing  : !e.playArgs[0]
      });
    }
  },
  //REFACTOR THIS INTO ONE FUNCTION CALL
  waveClass: function() {
    let extra = this.props.classExtra ? this.props.classExtra : '';
    return 'waveform-' + extra;
  },

  audioSelection : function () {
    switch (this.props.file) {
      case 'First_Impressions_She' :
        return herAudioForImpressions;
      case 'First_Impressions_He' :
        return hisAudioForImpressions;
      case 'hisCuddleRoom' :
        return hisCuddleRoom;
      case 'herCuddleRoom' :
        return herCuddleRoom;
      case 'hisNumberExchange':
        return hisNumberExchange;
      case 'herNumberExchange' :
        return herNumberExchange;
      case 'hisNightCap' :
        return hisNightCap;
      case 'herNightCap' :
        return herNightCap;
      case 'next' :
        return nextOn;
    }
  },
  render: function () {
    const options = {
      waveColor     : 'rgba(255, 255, 255, 0.6)',
      progressColor : 'rgba(255, 255, 255, 1)',
      barWidth      : 3,
      cursorWidth   : 0,
      height        : 384,
      normalize     : true,
      fillParent    : true
    };

    var btnClass = classNames({
      'play'   : !this.state.playing,
      'pause'  : this.state.playing,
      'replay' : !this.state.playing && this.state.finished
    });

    return (
      <div id={this.id} className={this.audioClass()}>
        <div className="content-wrap">
          <div className="header-container"><h1>{this.props.header}</h1></div>
          <div className="timer">
            {this.state.elapsed}
          </div>
          <div className="play-pause">
            <div className={btnClass} onClick={(event) => this.handleTogglePlay(this)}></div>
          </div>
          <div className="audio-wrapper">
            <div className="audio-element">
              <Waveform audioFile={this.audioSelection()} pos={this.state.pos} onPosChange={this.handlePosChange} onPlayChange={this.handlePlayChange} onFinish={this.handleFinish} playing={this.state.playing} options={options} shouldLaunch={this.props.active}/>
            </div>
          </div>
          <div className="next-btn"></div>
        </div>
      </div>
    )
  }
});

const mapStateToProps = function (store) {
  return {
    audioTrack   : store.audioState.audioTrack,
    audioPlaying : store.audioState.audioPlaying
  }
};

export default connect(mapStateToProps)(Audio);