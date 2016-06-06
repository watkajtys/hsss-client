import React from 'react';
import Messaging from './Messaging';
import Splash from './intro/Splash';
import Intro from './intro/Intro';
import EmbeddedSlider from './EmbeddedSlider';
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
  trifurcate : function (slide) {
    if (slide.special && slide.specialType === 'trifurcate') {
      return true
    }
  },
  deckIsActive: function (slide) {
    console.log(slide, "DECK SLIDE");
    if (this.props.activeSlide == slide.deck) {
      return true
    }
  },
  deckIsHorizontallyActive : function (slide) {
    if (this.props.activeSlideHorizontal == slide.order) {
      return true
    }
  },
  sheContainer: function(slide) {
    if (slide.container && slide.container === 'sue') {
      return true
    }
  },
  heContainer: function (slide) {
    if (slide.container && slide.container === 'john') {
      return true
    }
  },
  render: function () {
    var slideType;
    if (this.isSplash(this.props.slide)) {
      slideType = <Splash />;
    } else if (this.isIntro(this.props.slide)) {
      slideType = <Intro deck={this.props.slide} activeSlide={this.props.activeSlideVert} active={this.deckIsActive(this.props.slide)}/>;
    } else if (this.trifurcate(this.props.slide)) {
      slideType = <EmbeddedSlider slides={this.props.slide.sections} activeVert={this.props.activeSlideVert} initial="1" class=".swiper-container-hor" deck={this.props} active={this.deckIsActive(this.props.slide)}/>
    } else if (this.sheContainer(this.props.slide)) {
      slideType = <Messaging deck={this.props.slide} classExtra='she' active={this.deckIsHorizontallyActive(this.props.slide)}/>
    } else if (this.heContainer(this.props.slide)) {
      slideType = <Messaging deck={this.props.slide} classExtra='he' active={this.deckIsHorizontallyActive(this.props.slide)}/>
    }
    else {
      slideType = <Messaging deck={this.props.slide} activeVert={this.props.activeSlide} active={this.deckIsActive(this.props.slide)}/>;
    }
    return (
      <div className="slide swiper-slide" key={this.id}>
        {slideType}
      </div>
    )
  }
})