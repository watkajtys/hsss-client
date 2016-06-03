import React from 'react';
import Splash from './intro/Splash';
require('../css/slide.css');

export default React.createClass({
  componentDidMount: function () {
    console.log('mount');
    var swiper = new Swiper('.swiper-container', {
      direction: 'vertical',
      calculateHeight:true,
      spaceBetween: 400
    });
  },
  getSlides: function () {
    return this.props.slides || [];
  },
  isSplash: function (slide) {
    if (slide.special && slide.specialType === 'splash') {
      return true
    }
  },
  render: function () {
    return (
      <div className="slide_container swiper-container">
        <div className="swiper-wrapper">
          {this.getSlides().map(slide =>
            <div className="slide swiper-slide" key={slide.deck}>
              {this.isSplash(slide) ? <Splash/> :
                <h1>{slide.deck}</h1>
              }
            </div>
          )}
        </div>
      </div>
    )
  }
});