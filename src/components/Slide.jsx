import React from 'react';
import Messaging from './Messaging';
import Splash from './intro/Splash';
import Intro from './intro/Intro';
let _ = require('lodash');

export default React.createClass({
  componentWillMount: function () {
    this.id = _.uniqueId('side_');
  },
  componentDidUpdate: function () {
    console.log(this.props.activeSlide, 'ACTIVE FROM SLIDE')
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
  deckIsActive: function (slide) {
    if (this.props.activeSlide == slide.deck) {
      return true
    }
  },
  render: function () {
    var slideType;
    if (this.isSplash(this.props.slide)) {
      slideType = <Splash />;
    } else if (this.isIntro(this.props.slide)) {
      slideType = <Intro deck={this.props.slide} active={this.deckIsActive(this.props.slide)}/>;
    } else {
      slideType = <Messaging deck={this.props.slide} active={this.deckIsActive(this.props.slide)}/>;
    }
    return (
      <div className="slide swiper-slide" key={this.id}>
        {slideType}
      </div>
    )
  }
})