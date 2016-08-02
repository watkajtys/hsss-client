import React from 'react';
import {connect} from 'react-redux';
import store from './shared/store';

var classNames = require('classnames');

require('../css/header.css');

const Header = React.createClass({
  render : function () {

    var headerClass = classNames({
      'visible' : this.props.visible,
      'he'      : this.props.activeContainer === 'JOHN',
      'she'     : this.props.activeContainer === 'SUE',
      'intro'   : this.props.activeContainer === 'INTRO'
    });
    return (
      <header className={headerClass}>
        <div id='burger-icon'>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </header>
    )
  }
});

const mapeStateToProps = function (store) {
  return {
    activeContainer : store.slideState.activeContainer,
    visible         : store.headerState.visible
  }
};

export default connect(mapeStateToProps)(Header);