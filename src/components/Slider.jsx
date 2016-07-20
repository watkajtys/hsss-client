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
    var swiper = new Swiper('.swiper-container-vert', {
      direction: that.props.direction,
      calculateHeight:true,
      spaceBetween: 400,
      initialSlide: that.props.initial ? parseInt(that.props.initial) : 0,
      onSlideChangeEnd: function (swiper) {
        console.log('%cslide change end - after %d', 'font-size: 12px; color: cyan; background: black;', swiper.activeIndex);
        that.setState({activeSlide: swiper.activeIndex});
      }
    });
  },
  componentWillUnmount: function () {
    localStorage.removeItem('activeVerticalSlide');
  },
  render: function () {
    return (
      <div className="slide_container swiper-container swiper-container-vert" key={this.id}>
        <div className="swiper-wrapper">
          {this.getSlides().map(slide =>
            <Slide key={slide.description} slide={slide} activeSlide={this.state.activeSlide}/>
          )}
        </div>
      </div>
    )
  }
});