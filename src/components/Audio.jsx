import React from 'react';
require('../css/audio.css');
let _ = require('lodash');
var hisAudio = require('../audio/First_Impressions_He_ALT_1-2.mp3');
var herAudio = require('../audio/First_Impressions_She_ALT_1-2.mp3');

export default React.createClass({
  componentWillMount: function () {
    this.id = _.uniqueId('audio_');
  },
  componentDidMount : function () {
    let container = (this.props.classExtra === 'he' ) ? '.waveform-he' : '.waveform-she';
    this.waveSurfer = WaveSurfer.create({
      container: container,
      waveColor: 'rgba(255, 255, 255, 0.6)',
      progressColor: 'rgba(255, 255, 255, 1)',
      barWidth : 3,
      cursorWidth: 0,
      height: 512,
      normalize: true
    });

    if (this.props.classExtra && (this.props.classExtra === 'he')) {
      this.waveSurfer.load(hisAudio);
    } else {
      this.waveSurfer.load(herAudio);
    }

    this.waveSurfer.on('audioprocess', function() {
      console.log(this.waveSurfer.getCurrentTime());
    });
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
  //REFACTOR THIS INTO ONE FUNCTION CALL
  waveClass: function() {
    let extra = this.props.classExtra ? this.props.classExtra : '';
    return 'waveform-' + extra;
  },
  render: function () {
    return (
      <div id={this.id} className={this.audioClass()}>
        <div className="content-wrap">
          <div className="header-container"><h1>{this.props.header}</h1></div>
          <div className="play-pause">
            <i className="fa fa-play" onClick={(event) => this.toggleAudio(event)}></i>
          </div>
          <div className="audio-wrapper">
            <div className="audio-element">
              <div className={this.waveClass()}></div>
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