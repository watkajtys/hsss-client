import React from 'react';
import {connect} from 'react-redux';
import store from './shared/store';

require('../css/header.css');

const Header = React.createClass({

  componentWillMount() {
    //INIT HEADER CLASS STRING
    this.headerClass = '';
  },

  componentWillReceiveProps(nextProps) {

    //SETTING THE HEADER CLASS
    switch(nextProps.activeContainer) {
      case 'JOHN' :
        this.headerClass = 'he';
        break;
      case 'SUE' :
        this.headerClass = 'she';
        break;
      case 'INTRO' :
        this.headerClass = 'intro';
        break;
      default :
        this.headerClass = 'intro';
    }

    //TOGGLING VISIBILITY OF THE HEADER
    if (nextProps.visible) {
      this.headerClass += ' visible'
    } else {
      this.headerClass.replace(/ visible/, '');
    }
  },
  render : function () {

    return (
      <header className={this.headerClass}>
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