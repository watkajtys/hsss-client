import React from 'react';
import {connect} from 'react-redux';
import store from './shared/store';
import Slide from './Slide';
require('../css/slide.css');
let _ = require('lodash');

export default React.createClass({
  getInitialState: function() {
    return {
      activeSlide: 0,
      renderedSlides: []
    }
  },
  componentWillMount: function () {
    this.id = _.uniqueId('slide-wrap_');
  },
  componentDidMount: function () {
    this.setState({renderedSlides: this.state.renderedSlides.concat(this.props.slides[0])});
    let that = this;
    this.swipercustom = new Swiper('.' + this.props.customClass, {
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
  slideTo : function (index) {
    this.swipercustom.slideTo(index);
  },
  appendSlide : function (slide) {
    //ADDING THE NEXT SLIDE TO THE STATE AND THUS RENDERING
    this.setState({renderedSlides: this.state.renderedSlides.concat(slide)});
    //CALLING AN UPDATE ON THE SWIPER TO ADD RENDERED SLIDE TO SWIPE COMPONENT
    this.swipercustom.update(true);
    //TRANSITION TO THE NEWLY APPENDED SLIDE
    this.swipercustom.slideNext(true, 500);
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
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (this.props.index !== nextProps.index) {
      this.slideTo(nextProps.index);
    }
  },
  render: function () {
    return (
      <div className={this.generateClassList()} key={this.id}>
        <div className="swiper-wrapper">
          {this.state.renderedSlides.map(slide =>
            <Slide key={slide.description} slide={slide} activeSlide={this.props.activeSlide}/>
          )}
        </div>
      </div>
    )
  }
});

const mapStateToProps = function (store) {
  return {
    activeSlide : store.slideState.activeSlide,
    activeContainer: store.slideState.activeContainer
  }
};

export default connect(mapStateToProps)(CustomizableSlider);