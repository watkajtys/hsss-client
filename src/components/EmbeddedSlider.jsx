import React from 'react';
import Slide from './Slide';
import { connect } from 'react-redux';
import store from './shared/store';
// import store from '../components/shared/store.js';
require('../css/slide.css');
let _ = require('lodash');

const EmbeddedSlider =  React.createClass({
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
        let index = horizontalSlider.activeIndex;
        const action = {
          type: 'UPDATE_ACTIVE_CONTAINER',
          activeContainer: that.props.slides[index].container
        };
        store.dispatch(action)
      },
      // onSlideNextStart: function (horizontalSlider) {
      //   localStorage.setItem('activeHorizontalSlide', horizontalSlider.activeIndex);
      // },
      // onSlidePrevStart : function (horizontalSlider) {
      //   localStorage.setItem('activeHorizontalSlide', horizontalSlider.activeIndex);
      // }
      onInit: function (horizontalSlider) {
        let index = horizontalSlider.activeIndex;
        const action = {
          type: 'UPDATE_ACTIVE_CONTAINER',
          activeContainer: that.props.slides[index].container
        };
        store.dispatch(action)

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
            <Slide key={slide.description} slide={slide}/>
          )}
        </div>
      </div>
    )
  }
});

const mapStateToProps = function (store) {
  return {
    activeSide : store.slideState.activeSide,
    activeContainer: store.slideState.activeContainer
  }
};

export default connect(mapStateToProps)(EmbeddedSlider)