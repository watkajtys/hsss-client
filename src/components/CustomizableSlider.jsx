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
      console.log('FIRST ACTION', firstSlide);
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
        //WE ONLY WANT THE ACTIVE CONTAINER TO REPORT SLIDE CHANGES
        if (that.props.container == that.props.activeContainer) {
          console.log('%cslide change start - after %d', 'font-size: 12px; color: cyan; background: black;', swipercustom.activeIndex);
          let index = swipercustom.activeIndex;
          console.log(index, that.props.slides[index]);
          const action = {
            type: 'CHANGE_SLIDE',
            activeSlide: that.props.slides[index].slide
          };
          store.dispatch(action)
        }
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

    });
  },
  slideTo : function (index) {
    this.swipercustom.slideTo(index);
  },
  appendSlide : function (slide) {
    console.log('appending', slide);
    //ADDING THE NEXT SLIDE TO INTERNAL STATE AND RENDING IT
    this.setState({renderedSlides: this.state.renderedSlides.concat(slide)});
    let that = this;
    //BRIEF TIMEOUT FOR A DELAY AND ALLOW REACT TO RENDER
    setTimeout(function () {
      //CALLING AN UPDATE ON THE SWIPER TO ADD RENDERED SLIDE TO SWIPE COMPONENT
      that.swipercustom.update(true);
    }, 500)
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
  generateClassList : function () {
    console.log('GENERATE');
    return 'slide_container swiper-container ' + this.props.customClass; 
  },
  componentWillReceiveProps(nextProps) {
    console.log(nextProps, 'NEXT PROPS!!!');
    let index = this.swipercustom.activeIndex;

    //IF THE NEXT PROPS IS DIFFERENT FROM THE CURRENT SLIDE
    if (this.props.slides[index].slide !== nextProps.activeSlide) {
      //ATTEMPT TO FIND THE DECK NUMBER (etc D3) WITHIN THE RENDERED SLIDES AND RETURN IT
      var found = this.state.renderedSlides.filter(function(slide) {
        return slide.slide === nextProps.activeSlide;
      });
      if (found && found[0]) {
        console.log(found, 'FOUND SHIT SO SLIDE TO');
        //FIND THE POSITION IN THE STACK AND SLIDE TO IT.
        let position = this.state.renderedSlides.map(function(slide) {return slide.slide; }).indexOf(nextProps.activeSlide);
        this.slideTo(position);
      } else {
        //WE DON'T HAVE A MATCH SO FIND IT WITHIN THE SLIDES WAITING TO BE RENDERED
        console.log('WE AINT FOUND  SHIT', this.props.slides);
        let slideItem = this.props.slides.filter(function(slide) {
          return slide.slide === nextProps.activeSlide;
        });
        console.log(slideItem, 'SLIDE ITEM');
        let itemSingle = slideItem[0];

        if (itemSingle && itemSingle.loadNextAutomatically && itemSingle.nextSlide) {
          //APPEND THE NEW SLIDE
          var that = this;
          that.appendSlideAndTransition(slideItem);
          let nextItem = this.props.slides.filter(function(slide) {
            return slide.slide === itemSingle.nextSlide;
          });
          if (nextItem) {
            console.log(nextItem, "NE$XT");
            setTimeout(function() {
              that.appendSlide(nextItem)
            }, 3000)

          }
        } else {
          //APPEND THE NEW SLIDE
          this.appendSlideAndTransition(slideItem);
        }
      }
    }

  },
  render: function () {
    return (
      <div className={this.generateClassList()} key={this.id}>
        <div className="swiper-wrapper">
          {this.state.renderedSlides.map(slide =>
            <Slide key={slide.description} slide={slide} activeSlide={this.props.activeSlide} activeContainer={this.props.activeContainer} container={this.props.container}/>
          )}
        </div>
      </div>
    )
  }
});

const mapStateToProps = function (store) {
  return {
    activeSlide     : store.slideState.activeSlide,
    activeContainer : store.slideState.activeContainer,
  }
};

export default connect(mapStateToProps)(CustomizableSlider);