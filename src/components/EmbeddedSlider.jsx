import React from 'react';
import CustomizableSlider from './CustomizableSlider';
import { connect } from 'react-redux';
import store from './shared/store';
var updateEntry = require('../functions/updateEntry').updateEntry;
// import store from '../components/shared/store.js';
require('../css/slide.css');
let _ = require('lodash');

const EmbeddedSlider =  React.createClass({

  getInitialState : function() {
    return {
      rendered: [],
      toggled : 0
    }
  },
  componentWillMount: function () {
    this.id = _.uniqueId('slide-wrap-hor_');
  },
  componentDidMount: function () {
    var that = this;
    var initial = this.determineLaunchSide(this.props.launchSide);
    this.horizontalSlider = new Swiper('.swiper-container-hor', {
      direction: 'horizontal',
      initialSlide: initial,
      spaceBetween: 0,
      onSlideChangeEnd: function (horizontalSlider) {
        console.log('%cslide change end - after %d', 'font-size: 12px; color: purple; background: black;', horizontalSlider.activeIndex);
        let index = horizontalSlider.activeIndex;
        const action = {
          type: 'UPDATE_ACTIVE_CONTAINER',
          activeContainer: that.props.slides[index].container
        };
        store.dispatch(action);
        let toggleNum = that.state.toggled + 1;
        that.setState({toggled: toggleNum });
        let dataObj = {sideToggle: that.state.toggled};
        updateEntry(dataObj);
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
  componentWillReceiveProps(nextProps) {
    if (this.props.side !== nextProps.side) {
      this.toggleSide(nextProps.side);
    }

    if (nextProps.lockSide) {
      this.lockSwiping();
    } else {
      this.unlockSwiping();
    }

    if (this.props.launchSide !== nextProps.launchSide) {
      //ON THE WRONG SIDE, FIX IT
      this.toggleSide(nextProps.launchSide)
    }
  },
  determineLaunchSide : function (side) {
    let index = 1;
    if (side === 'SHE') {
      return 1
    } else {
      return 0
    }
  },
  toggleSide : function (side) {
    let index = 1;
    if (side === 'SHE') {
      index = 1;
    } else {
      index = 0;
    }
    this.horizontalSlider.slideTo(index);
  },
  lockSwiping : function () {
    this.horizontalSlider.lockSwipes();
  },
  unlockSwiping : function () {
    this.horizontalSlider.unlockSwipes();
  },
  getSlides: function () {
    return this.props.slides || [];
  },
  render: function () {
    return (
      <div className="slide_container swiper-container swiper-container-hor" key={this.id}>
        <div className="swiper-wrapper">
          {this.getSlides().map((slide, index) =>
            <div className="slide swiper-slide" key={index}>
              <CustomizableSlider slides={slide.characterSlides} customClass={slide.customClass} direction="vertical" index={this.props.indexToTrigger} activeSlide={this.props.activeSlide} container={slide.container}/>
            </div>
          )}
        </div>
      </div>
    )
  }
});

const mapStateToProps = function (store) {
  return {
    activeSide      : store.slideState.activeSide,
    activeContainer : store.slideState.activeContainer,
    episode         : store.episodeState.episode,
    launchSide      : store.episodeState.launchSide,
    lockSide        : store.slideState.lockedSide
  }
};

export default connect(mapStateToProps)(EmbeddedSlider);