import React from 'react';
import Header from './Header';
import Slider from './Slider';
import intro_script from '../script/shared.js';

export default React.createClass({
  render: function () {
    return (
      <main>
        <Header/>
        <div id="content">
          <Slider slides={intro_script} direction="vertical" initial="0"/>
        </div>
      </main>
    )
  }
})