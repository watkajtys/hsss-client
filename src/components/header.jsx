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

  handleClick : function () {

    let restart = {
      type : 'RESTART',
      restart : true
    };

    store.dispatch(restart);
  },
  render : function () {

    return (
      <header className={this.headerClass}>
        <div className="back-btn" onClick={(event) => this.handleClick(this)}></div>
      </header>
    )
  }
});

const mapStateToProps = function (store) {
  return {
    activeContainer : store.slideState.activeContainer,
    visible         : store.headerState.visible
  }
};

export default connect(mapStateToProps)(Header);