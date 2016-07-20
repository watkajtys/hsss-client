import React from 'react';
import Messaging from './Messaging';
import Splash from './intro/Splash';
import Intro from './intro/Intro';
import EmbeddedSlider from './EmbeddedSlider';
import Audio from './Audio';
let _ = require('lodash');

export default React.createClass({
  componentWillMount: function () {
    this.id = _.uniqueId('side_');
  },
  isSplash: function (slide) {
    if (slide.special && slide.specialType === 'splash') {
      return true
    }
  },
  isIntro: function (slide) {
    if (slide.special && slide.specialType === 'intro') {
      return true
    }
  },
  bifurcate : function (slide) {
    if (slide.special && slide.specialType === 'bifurcate') {
      return true
    }
  },
  deckIsActive: function (slide) {
    if (this.props.activeSlide === slide.slide && this.props.container === this.props.activeContainer) {
      console.log('yuop');
      return true
    }
  },
  isAudio : function (slide) {
    if (slide.special && slide.specialType === 'audio') {
      return true
    }
  },
  render: function () {
    var slideType;
    if (this.isSplash(this.props.slide)) {
      slideType = <Splash />;
    } else if (this.isIntro(this.props.slide)) {
      slideType = <Intro deck={this.props.slide} activeSlide={this.props.activeSlide} active={this.deckIsActive(this.props.slide)}/>;
    } else if (this.bifurcate(this.props.slide)) {
      slideType = <EmbeddedSlider slides={this.props.slide.sections} activeSlide={this.props.activeSlide} initial="1" class=".swiper-container-hor" deck={this.props} active={this.deckIsActive(this.props.slide)} side={this.props.side} container={this.props.slide.container}/>
    } else if (this.isAudio(this.props.slide)) {
      slideType = <Audio header={this.props.slide.header} file={this.props.slide.audioFile} classExtra={this.props.slide.gender} activeSlide={this.props.activeSlide}/>
    } else {
      slideType = <Messaging deck={this.props.slide} activeSlide={this.props.activeSlide} active={this.deckIsActive(this.props.slide)} classExtra={this.props.slide.charmsg} key={this.id} activeContainer={this.props.activeContainer} parentContainer={this.props.container}/>;
    }
    return (
      <div className="slide swiper-slide" key={this.id}>
        {slideType}
      </div>
    )
  }
})