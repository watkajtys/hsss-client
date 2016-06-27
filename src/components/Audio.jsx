import React from 'react';
require('../css/audio.css');
let _ = require('lodash');
var hisAudio = require('../audio/First_Impressions_He_ALT_1-2.mp3');
var herAudio = require('../audio/First_Impressions_She_ALT_1-2.mp3');
import Waveform from './shared/waveform';

export default React.createClass({

  getInitialState: function () {
    return {
      playing: false,
      pos: 0,
      elapsed: '0:00'
    }
  },

  componentWillMount: function () {
    this.id = _.uniqueId('audio_');
  },
  componentDidMount : function () {

  },
  audioClass: function () {
    let extra = this.props.classExtra ? this.props.classExtra : '';
    return 'audio-container ' + extra;
  },

  handleTogglePlay: function () {
    this.setState({
      playing: !this.state.playing
    });
  },

  handlePosChange(e) {
    this.setState({
      pos: e.originalArgs ? e.originalArgs[0] : +e.target.value,
      elapsed: e.originalArgs ? e.originalArgs[1] : '0:00'
    });
  },
  //REFACTOR THIS INTO ONE FUNCTION CALL
  waveClass: function() {
    let extra = this.props.classExtra ? this.props.classExtra : '';
    return 'waveform-' + extra;
  },
  render: function () {
    const options = {
      waveColor: 'rgba(255, 255, 255, 0.6)',
      progressColor: 'rgba(255, 255, 255, 1)',
      barWidth : 3,
      cursorWidth: 0,
      height: 512,
      normalize: true
    };

    return (
      <div id={this.id} className={this.audioClass()}>
        <div className="content-wrap">
          <div className="header-container"><h1>{this.props.header}</h1></div>
          <div className="timer">
            {this.state.elapsed}
          </div>
          <div className="play-pause">
            <div className="replay" onClick={(event) => this.handleTogglePlay(event)}></div>
          </div>
          <div className="audio-wrapper">
            <div className="audio-element">
              <Waveform audioFile={herAudio} pos={this.state.pos} onPosChange={this.handlePosChange} playing={this.state.playing} options={options}/>
            </div>
          </div>
        </div>
        <div className="start-btn">
          <i className="fa fa-angle-up up-icon"></i>
          <h1 className="start-text">Next</h1>
        </div>
      </div>
    )
  }
});