import React from 'react';
import {connect} from 'react-redux';
import store from './shared/store';
import Slide from './Slide';
var updateEntry = require('../functions/updateEntry').updateEntry;
require('../css/slide.css');
let _ = require('lodash');

const CustomizableSlider = React.createClass({
  getInitialState          : function () {
    return {
      renderedSlides : []
    }
  },
  componentWillMount       : function () {
    this.id = _.uniqueId('slide-wrap_');
  },
  componentDidMount        : function () {

    //WHEN THIS MOUNTS, LOAD IN THE FIRST SLIDE AUTOMATICALLY
    console.log('%cINIT CSWIPER', 'font-size: 14px; color: orange; background: black');
    let firstSlide = this.props.slides[0];
    if (firstSlide) {
      console.log('FIRST ACTION', firstSlide);
      this.setState({renderedSlides : this.state.renderedSlides.concat(firstSlide)});
      const firstAction = {
        type        : 'CHANGE_SLIDE',
        activeSlide : firstSlide.slide,
        activeParent : firstSlide.parent
      };
      store.dispatch(firstAction);
      this.determineVisibility(firstSlide);
    }

    let that          = this;
    this.swipercustom = new Swiper('.' + that.props.customClass, {
      direction          : 'vertical',
      calculateHeight    : true,
      spaceBetween       : 400,
      initialSlide       : that.props.initial ? parseInt(that.props.initial) : 0,
      onTransitionEnd    : function (swipercustom) {
        //WE ONLY WANT THE ACTIVE CONTAINER TO REPORT SLIDE CHANGES
        console.log('%cSLIDE CHANGE END', 'font-size : 12px; color: red; background: blue');
        if (that.props.container == that.props.activeContainer) {
          let index = swipercustom.activeIndex;
          console.log('%cNEW SLIDE', 'font-size: 12px; color: yellow; background: black;', index, that.state.renderedSlides[index].slide);
          //SHOULD L2R SWIPING BE LOCKED? IF DIVERGENT - YES - OTHERWISE - NO
          var locked = that.state.renderedSlides[index].slide.match(/\d.\d./) ? true : false ;
          let dataObj = {
            lastDeck : that.state.renderedSlides[index].slide,
            lastSide : that.props.container
          };
          updateEntry(dataObj);
          const action = {
            type         : 'CHANGE_SLIDE',
            activeSlide  : that.state.renderedSlides[index].slide,
            activeParent : that.state.renderedSlides[index].parent,
            lockedSide   : locked
          };
          store.dispatch(action);
          that.determineVisibility(that.state.renderedSlides[index]);
        }
      },
      onSlideChangeStart : function (swipercustom) {
        let index = swipercustom.activeIndex;

      },
      onInit             : function (swipercustom) {
        if (that.props.slides[0].loadNextAutomatically) {
          setTimeout(function () {
            that.setState({renderedSlides : that.state.renderedSlides.concat(that.props.slides[1])});
            //CALLING AN UPDATE ON THE SWIPER TO ADD RENDERED SLIDE TO SWIPE COMPONENT
            that.swipercustom.update(true);
          }, 500)
        }
      }

    });
  },
  determineVisibility      : function (slide) {
    console.log('VIZ CHECK', slide)
    var headerAction = {
      type    : 'HEADER_VISIBILITY',
      visible : false
    };
    if (slide.visibleHeader) {
      headerAction.visible = true;
    }
    store.dispatch(headerAction);
  },
  slideTo                  : function (index) {
    this.swipercustom.slideTo(index, 500, true);
  },
  appendSlide              : function (slide) {
    console.log('appending', slide);
    //ADDING THE NEXT SLIDE TO INTERNAL STATE AND RENDING IT
    this.setState({renderedSlides : this.state.renderedSlides.concat(slide)});
    let that = this;
    //BRIEF TIMEOUT FOR A DELAY AND ALLOW REACT TO RENDER
    setTimeout(function () {
      //CALLING AN UPDATE ON THE SWIPER TO ADD RENDERED SLIDE TO SWIPE COMPONENT
      that.swipercustom.update(true);
    }, 500)
  },
  appendSlideAndTransition : function (slide, position) {
    console.log('appending and sliding', slide);
    //ADDING THE NEXT SLIDE TO THE STATE AND THUS RENDERING
    if (!position) {
      //IF NO SPECIFIED POSITION - CONCAT THE LATEST TO THE END
      this.setState({renderedSlides : this.state.renderedSlides.concat(slide)});
    } else {
      //SPECIFIC POSITION SPECIFIED - SO ADD SLIDE IN AT APPROPRIATE INDEX
    }
    let that = this;
    //BRIEF TIMEOUT FOR A DELAY AND ALLOW REACT TO RENDER
    setTimeout(function () {
      //CALLING AN UPDATE ON THE SWIPER TO ADD RENDERED SLIDE TO SWIPE COMPONENT
      that.swipercustom.update(true);
      //TRANSITION TO THE NEWLY APPENDED SLIDE
      that.swipercustom.slideNext(true, 500);
    }, 1000)
  },
  generateClassList        : function () {
    return 'slide_container swiper-container ' + this.props.customClass;
  },
  determineSlideRendering : function (inactiveSide, nextProps) {
    var regex = /[a-zA-Z]/;
    var found;
    var parent;

    if (inactiveSide && regex.test(nextProps.activeSlide)) {
      var parentMatch = nextProps.activeSlide.match(/\d.\d/);
      if (parentMatch) {parent = parentMatch[0]}
      console.log(parent, 'parent');
      found = this.state.renderedSlides.filter(function (slide) {
        return slide.slide === parent;
      });

      if (found && found[0]) {
        console.log(found[0].slide, 'FOUND SHIT SO SLIDE TO');
        //FIND THE POSITION IN THE STACK AND SLIDE TO IT.
        let position = this.state.renderedSlides.map(function (slide) {
          return slide.slide;
        }).indexOf(parent);
        this.slideTo(position);
      } else {
        //WE DON'T HAVE A MATCH SO FIND IT WITHIN THE SLIDES WAITING TO BE RENDERED
        let slideItem = this.props.slides.filter(function (slide) {
          return slide.slide === parent;
        });

        let itemSingle = slideItem[0];

        if (itemSingle && itemSingle.loadNextAutomatically && itemSingle.nextSlide) {
          //APPEND THE NEW SLIDE
          var that = this;
          that.appendSlideAndTransition(slideItem);
          let nextItem = this.props.slides.filter(function (slide) {
            return slide.slide === itemSingle.nextSlide;
          });

          if (nextItem) {
            setTimeout(function () {
              that.appendSlide(nextItem)
            }, 1500)
          }
        } else {
          //APPEND THE NEW SLIDE
          this.appendSlideAndTransition(slideItem);
        }
      }
    } else {
      //ATTEMPT TO FIND THE DECK NUMBER (etc D3) WITHIN THE RENDERED SLIDES AND RETURN IT
      found = this.state.renderedSlides.filter(function (slide) {
        return slide.slide === nextProps.activeSlide;
      });

      if (found && found[0]) {
        console.log(found[0].slide, 'FOUND SHIT SO SLIDE TO');
        //FIND THE POSITION IN THE STACK AND SLIDE TO IT.
        let position = this.state.renderedSlides.map(function (slide) {
          return slide.slide;
        }).indexOf(nextProps.activeSlide);
        this.slideTo(position);
      } else {
        //WE DON'T HAVE A MATCH SO FIND IT WITHIN THE SLIDES WAITING TO BE RENDERED
        let slideItem = this.props.slides.filter(function (slide) {
          return slide.slide === nextProps.activeSlide;
        });

        let itemSingle = slideItem[0];

        if (itemSingle && itemSingle.loadNextAutomatically && itemSingle.nextSlide) {
          //APPEND THE NEW SLIDE
          var that = this;
          that.appendSlideAndTransition(slideItem);
          let nextItem = this.props.slides.filter(function (slide) {
            return slide.slide === itemSingle.nextSlide;
          });

          if (nextItem) {
            setTimeout(function () {
              that.appendSlide(nextItem)
            }, 1500)
          }
        } else {
          //APPEND THE NEW SLIDE
          this.appendSlideAndTransition(slideItem);
        }
      }
    }
  },
  componentWillReceiveProps(nextProps) {
    let activeIndex = this.swipercustom.activeIndex;

    if (nextProps.restart) {
      //ROLL IT ALL BACK TO POSITION 0
      this.swipercustom.slideTo(0, 500, false);
      let restart = {
        type : 'RESTART',
        restart : false
      };

      store.dispatch(restart);
    }

    if (nextProps.launched) {
      //IF LAUNCH HAS BEEN TRIGGERED
      if (this.props.customClass === 'MAIN') {
        //SEND THE MAIN SLIDER TO POSITION 3 (BIFURCATED START)
        this.swipercustom.slideTo(3, 500, false);
      } else {
        //MAKE SURE ALL OTHER SLIDERS ARE AT POSITION 0
        this.swipercustom.slideTo(0, 0, false);
      }
      //UPDATE SLIDE AND CONTAINERS TO START POSITION
      let launch = {
        type            : 'UPDATE_SLIDE_AND_CONTAINER',
        activeSlide     : '3.3',
        activeContainer : nextProps.launchSide === 'HE' ? 'JOHN' : 'SUE'
      };

      store.dispatch(launch);
      //RESET THE LAUNCH SYSTEM
      let reset = {
        type       : 'LAUNCH_EPISODE',
        launchSide : nextProps.launchSide,
        launched   : false
      };

      store.dispatch(reset);
    }

    if (this.props.container !== nextProps.activeContainer) {
      //THIS IS THE NON-ACTIVE SIDE
      if ((this.state.renderedSlides[activeIndex] && this.state.renderedSlides[activeIndex].slide) !== nextProps.activeSlide) {
        this.determineSlideRendering(true, nextProps);
      }

    } else {
      //IF WE'RE IN THE ACTIVE SIDE - DO THINGS AS NORMAL
      //IF THE NEXT PROPS IS DIFFERENT FROM THE CURRENT SLIDE
      if ((this.state.renderedSlides[activeIndex] && this.state.renderedSlides[activeIndex].slide) !== nextProps.activeSlide) {
        this.determineSlideRendering(false, nextProps);
      }
    }


  },
  render                   : function () {
    return (
      <div className={this.generateClassList()} key={this.id}>
        <div className="swiper-wrapper">
          {this.state.renderedSlides.map(slide =>
            <Slide key={slide.description} slide={slide} activeSlide={this.props.activeSlide}
                   activeContainer={this.props.activeContainer} container={this.props.container}/>
          )}
        </div>
      </div>
    )
  }
});

const mapStateToProps = function (store) {
  return {
    activeSlide     : store.slideState.activeSlide,
    activeParent    : store.slideState.activeParent,
    activeContainer : store.slideState.activeContainer,
    restart         : store.slideState.restart,
    launched        : store.episodeState.launched,
    launchSide      : store.episodeState.launchSide
  }
};

export default connect(mapStateToProps)(CustomizableSlider);