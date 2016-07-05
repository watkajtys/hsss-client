import React, { Component, PropTypes } from 'react';
import assign from 'deep-assign';
let _ = require('lodash');

class Waveform extends Component {

  constructor(props) {
    super(props);

    this.state = {
      pos : 0,
      elapsed: '00:00',
      finished: false
    };

    this._wavesurfer = Object.create(WaveSurfer);
    this._isReady    = false;
    this._loadAudio  = this._loadAudio.bind(this);
    this._seekTo     = this._seekTo.bind(this);
  }

  componentWillMount() {
    this.id = _.uniqueId('wave_');
  };

  componentDidMount() {
    const options = assign({}, this.props.options, {
      container: this.refs.wavesurfer
    });

    this._wavesurfer.init(options);

    //LOADED FILE AND DREW THE WAVES
    this._wavesurfer.on('ready', () => {
      this._isReady = true;

      //set initial position

      if (this.props.pos) {
        this._seekTo(this.props.pos);
      }
    });

    this._wavesurfer.on('audioprocess', (pos) => {
      var currentTimeInSeconds = Math.floor(this._wavesurfer.getCurrentTime());
      var formattedTime = this._toMSS(currentTimeInSeconds);
      this.setState({
        pos,
        elapsed : formattedTime
      });

      this.props.onPosChange({
        wavesurfer   : this._wavesurfer,
        originalArgs : [pos, formattedTime]
      });
    });

    //audioprocess not fired when seeking
    this._wavesurfer.on('seek', (pos) => {
      const formattedPos = this._posToSec(pos);
      this.setState({
        formattedPos
      })
    });

    this._wavesurfer.on('finish', () => {
      console.log('FINISH CALLED', this._wavesurfer);
      this.setState({
        finished : true
      });

      this.props.onPlayChange({
        playArgs : [this.state.finished]
      });
    });

    this._wavesurfer.on('play', () => {
      this.setState({
        finished : false
      });

      this.props.onPlayChange({
        playArgs : [this.state.finished]
      });
    });

    if (this.props.audioFile) {
      this._loadAudio(this.props.audioFile, this.props.audioPeaks);
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('recieve', nextProps);
    if (this.props.audioFile !== nextProps.audioFile) {
      this._loadAudio(nextProps.audioFile, nextProps.audioPeaks);
    }

    if (this.props.playing !== nextProps.playing ||
      this._wavesurfer.isPlaying() !== nextProps.playing) {
      if (nextProps.playing) {
        this._wavesurfer.play();
      } else {
        this._wavesurfer.pause();
      }
    }
  }

  componentWillUnmount() {
    this._wavesurfer.destroy();
  }

  _secToPos(sec) {
    return 1 / this._wavesurfer.getDuration() * sec;
  }

  _toMSS(secs) {
    var sec_num = parseInt(secs, 10);
    var minutes = Math.floor(sec_num / 60) % 60;
    var seconds = sec_num % 60;
    return (minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);
  }

  //recieves position as float and transforms to seconds
  _posToSec(pos) {
    return pos * this._wavesurfer.getDuration();
  }

  _seekTo(sec) {
    const pos = this._secToPos(sec);
    this._wavesurfer.seekTo(pos);
  }

  _loadAudio(audioFile, audioPeaks) {
    this._wavesurfer.load(audioFile, audioPeaks);
  }

  render() {
    let childrenWithProps = (this.props.children)
      ? React.Children.map(
      this.props.children,
      child => React.cloneElement(child, {
        wavesurfer: this._wavesurfer,
        isReady: this._isReady
      }))
      : false;
    return (
      <div>
        <div ref="wavesurfer" />
        {childrenWithProps}
      </div>
    );
  }
}


Waveform.propTypes = {
  playing: PropTypes.bool,
  pos: PropTypes.number,
  audioFile: (props, propName, componentName) => {
    const prop = props[propName];
    if (prop && typeof prop !== 'string' && !prop instanceof Blob && !prop instanceof File) {
      return new Error(`Invalid ${propName} supplied to ${componentName}
        expected either string or file/blob`);
    }

    return null;
  },

  mediaElt: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(HTMLElement)
  ]),
  audioPeaks: PropTypes.array,
  volume: PropTypes.number,
  zoom: PropTypes.number,
  onPosChange: PropTypes.func,
  onPlayChange: PropTypes.func,
  children: PropTypes.element,
  options: PropTypes.shape({
    audioRate: PropTypes.number,
    backend: PropTypes.oneOf(['WebAudio', 'MediaElement']),
    barWidth: (props, propName, componentName) => {
      const prop = props[propName];
      if (prop !== undefined && typeof prop !== 'number') {
        return new Error(`Invalid ${propName} supplied to ${componentName}
          expected either undefined or number`);
      }

      return null;
    },

    cursorColor: PropTypes.string,
    dragSelection: PropTypes.bool,
    fillParent: PropTypes.bool,
    hideScrollbar: PropTypes.bool,
    interact: PropTypes.bool,
    loopSelection: PropTypes.bool,
    mediaControls: PropTypes.bool,
    normalize: PropTypes.bool,
    pixelRatio: PropTypes.number,
    progressColor: PropTypes.string,
    scrollParent: PropTypes.bool,
    skipLength: PropTypes.number,
    waveColor: PropTypes.string,
    autoCenter: PropTypes.bool
  })
};

Waveform.defaultProps = {
  playing: false,
  pos: 0,
  options: Waveform.defaultParams,
  onPosChange: () => {},
  onPlayChange: () => {}
};

export default Waveform;