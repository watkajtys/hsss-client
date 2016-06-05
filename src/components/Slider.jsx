import React from 'react';
import Slide from './Slide';
require('../css/slide.css');
let _ = require('lodash');

export default React.createClass({
  getInitialState: function() {
    return {activeSlide: 0}
  },
  componentWillMount: function () {
    this.id = _.uniqueId('slide-wrap_');
  },
  componentDidMount: function () {
    let that = this;
    let swiper = new Swiper('.swiper-container', {
      direction: 'vertical',
      calculateHeight:true,
      spaceBetween: 400,
      onSlideChangeEnd: function (swiper) {
        console.log('%cslide change end - after %d', 'font-size: 12px; color: cyan; background: black;', swiper.activeIndex);
        that.setState({activeSlide: swiper.activeIndex});
      }
    });
  },
  getSlides: function () {
    return this.props.slides || [];
  },
  render: function () {
    return (
      <div className="slide_container swiper-container" key={this.id}>
        <div className="swiper-wrapper">
          {this.getSlides().map(slide =>
            <Slide slide={slide} activeSlide={this.state.activeSlide}/>
          )}
        </div>
      </div>
    )
  }
});