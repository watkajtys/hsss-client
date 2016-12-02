import React from 'react';
import Header from './header';
import CustomizableSlider from './CustomizableSlider';
import intro_script from '../script/shared.js';
require('../fonts/font.css');

export default React.createClass({
  render: function () {
    return (
      <main>
        <Header/>
        <div id="content">
          <CustomizableSlider slides={intro_script} direction="vertical" initial="0" container="INTRO" customClass="MAIN"/>
        </div>
      </main>
    )
  }
})