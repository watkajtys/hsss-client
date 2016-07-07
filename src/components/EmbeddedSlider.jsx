import React from 'react';
import Slide from './Slide';
require('../css/slide.css');
let _ = require('lodash');

export default React.createClass({
  getInitialState: function() {
    return {activeSlideHorizontal: 0, activeVert: this.props.activeVert}
  },
  componentWillMount: function () {
    this.id = _.uniqueId('slide-wrap-hor_');
  },
  componentDidMount: function () {
    var that = this;
    var horizontalSlider;
    horizontalSlider = new Swiper('.swiper-container-hor', {
      direction: 'horizontal',
      initialSlide: 1,
      spaceBetween: 150,
      onSlideChangeEnd: function (horizontalSlider) {
        console.log('%cslide change end - after %d', 'font-size: 12px; color: purple; background: black;', horizontalSlider.activeIndex);
        that.setState({activeSlideHorizontal: horizontalSlider.activeIndex});
      },
      onSlideNextStart: function (horizontalSlider) {
        localStorage.setItem('activeHorizontalSlide', horizontalSlider.activeIndex);
      },
      onSlidePrevStart : function (horizontalSlider) {
        localStorage.setItem('activeHorizontalSlide', horizontalSlider.activeIndex);
      }
    });
  },
  getSlides: function () {
    return this.props.slides || [];
  },
  render: function () {
    return (
      <div className="slide_container swiper-container swiper-container-hor">
        <div className="swiper-wrapper">
          {this.getSlides().map(slide =>
            <Slide key={slide.description} slide={slide} activeSlideVertical={this.state.activeVert} activeSlideHorizontal={this.state.activeSlideHorizontal}/>
          )}
        </div>
      </div>
    )
  }
});