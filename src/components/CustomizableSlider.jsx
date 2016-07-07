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
    console.log(this.props, 'DA PROPS');
    var swipercustom = new Swiper('.' + this.props.customClass, {
      direction: 'vertical',
      calculateHeight:true,
      spaceBetween: 400,
      initialSlide: that.props.initial ? parseInt(that.props.initial) : 0,
      onSlideChangeEnd: function (swipercustom) {
        console.log('%cslide change end - after %d', 'font-size: 12px; color: cyan; background: black;', swipercustom.activeIndex);
        that.setState({activeSlide: swipercustom.activeIndex});
      },
      onSlideNextStart: function (swipercustom) {
        localStorage.setItem('activeVerticalSlide', swipercustom.activeIndex);
      },
      onSlidePrevStart : function (swipercustom) {
        localStorage.setItem('activeVerticalSlide', swipercustom.activeIndex);
      }
    });
  },
  componentWillUnmount: function () {
    localStorage.removeItem('activeVerticalSlide');
  },
  getSlides: function () {
    console.log('GET SLIDES', this.props.slides);
    return this.props.slides || [];
  },
  generateClassList : function () {
    console.log('GENERATE');
    return 'slide_container swiper-container ' + this.props.customClass; 
  },
  render: function () {
    return (
      <div className={this.generateClassList()} key={this.id}>
        <div className="swiper-wrapper">
          {this.getSlides().map(slide =>
            <Slide key={slide.description} slide={slide} activeCustomSlide={this.state.activeSlide}/>
          )}
        </div>
      </div>
    )
  }
});