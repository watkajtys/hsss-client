import React from 'react';
import {connect} from 'react-redux';
import store from './shared/store';
import Slide from './Slide';
require('../css/slide.css');
let _ = require('lodash');

const CustomizableSlider = React.createClass({
  getInitialState: function() {
    return {
      renderedSlides: []
    }
  },
  componentWillMount: function () {
    this.id = _.uniqueId('slide-wrap_');
  },
  componentDidMount: function () {

    //WHEN THIS MOUNTS, LOAD IN THE FIRST SLIDE AUTOMATICALLY
    console.log('%cINIT CSWIPER', 'font-size: 14px; color: orange; background: black');
    let firstSlide = this.props.slides[0];
    if (firstSlide) {
      console.log(firstSlide);
      this.setState({renderedSlides: this.state.renderedSlides.concat(firstSlide)});
      const firstAction = {
        type: 'CHANGE_SLIDE',
        activeSlide: firstSlide.slide
      };
      store.dispatch(firstAction)
    }

    let that = this;
    this.swipercustom = new Swiper('.' + that.props.customClass, {
      direction: 'vertical',
      calculateHeight:true,
      spaceBetween: 400,
      initialSlide: that.props.initial ? parseInt(that.props.initial) : 0,
      onSlideChangeEnd: function (swipercustom) {

      },
      onSlideChangeStart: function (swipercustom) {
        console.log('%cslide change start - after %d', 'font-size: 12px; color: cyan; background: black;', swipercustom.activeIndex);
        let index = swipercustom.activeIndex;
        console.log(index, that.props.slides[index]);
        const action = {
          type: 'CHANGE_SLIDE',
          activeSlide: that.props.slides[index].slide
        };
        store.dispatch(action)
      },
      onSlideNextStart: function (swipercustom) {
        localStorage.setItem('activeVerticalSlide', swipercustom.activeIndex);
      },
      onSlidePrevStart : function (swipercustom) {
        localStorage.setItem('activeVerticalSlide', swipercustom.activeIndex);
      },
      onInit : function (swipercustom) {
        if (that.props.slides[0].loadNextAutomatically) {
          setTimeout(function(){
            that.setState({renderedSlides: that.state.renderedSlides.concat(that.props.slides[1])});
            //CALLING AN UPDATE ON THE SWIPER TO ADD RENDERED SLIDE TO SWIPE COMPONENT
            that.swipercustom.update(true);
          }, 500)
        }
      }
      // onTransitionStart : function (swipercustom) {
      //   console.log('trans start');
      // },

    });

    //IF THE SECOND SLIDE NEEDS TO BE LOADED MANUALLY - DO IT
    // if (this.props.slides[0].loadNextAutomatically) {
    //   console.log('APPENd');
    //   this.appendSlide(this.props.slides[1]);
    // }
  },
  slideTo : function (index) {
    this.swipercustom.slideTo(index);
  },
  appendSlide : function (slide) {
    //ADDING THE NEXT SLIDE TO INTERNAL STATE AND RENDING IT
    this.setState({renderedSlides: this.state.renderedSlides.concat(slide)});
  },
  appendSlideAndTransition : function (slide) {
    console.log('appending and sliding', slide);
    //ADDING THE NEXT SLIDE TO THE STATE AND THUS RENDERING
    this.setState({renderedSlides: this.state.renderedSlides.concat(slide)});
    let that = this;
    //BRIEF TIMEOUT FOR A DELAY AND ALLOW REACT TO RENDER
    setTimeout(function () {
      //CALLING AN UPDATE ON THE SWIPER TO ADD RENDERED SLIDE TO SWIPE COMPONENT
      that.swipercustom.update(true);
      //TRANSITION TO THE NEWLY APPENDED SLIDE
      that.swipercustom.slideNext(true, 500);
    }, 1000)
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
    console.log(nextProps, 'NEXT PROPS!!!');
    let index = this.swipercustom.activeIndex;
    if (this.props.slides[index].slide !== nextProps.activeSlide) {
      var found = this.state.renderedSlides.filter(function(slide) {
        return slide.slide === nextProps.activeSlide;
      });
      if (found && found[0]) {
        console.log(found, 'FOUND SHIT SO SLIDE TO');
        position = this.state.renderedSlides.map(function(slide) {return slide.slide; }).indexOf(nextProps.activeSlide);
        this.slideTo(position);
      } else {
        console.log('WE AINT FOUND  SHIT', this.props.slides);
        let slideItem = this.props.slides.filter(function(slide) {
          return slide.slide === nextProps.activeSlide;
        });
        this.appendSlideAndTransition(slideItem);
      }
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