import React from 'react';
require('../css/header.css');

export default React.createClass({
  render: function () {
    return (
      <header>
        <div id='burger-icon'>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </header>
    )
  }
});