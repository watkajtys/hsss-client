import React from 'react';
var _ = require('lodash');

var avatars    = require('../../images/intro/john_sue_intro.png');
var johnClick  = require('../../images/intro/pov_select_john.png');
var sueClick   = require('../../images/intro/pov_select_sue.png');

export default React.createClass({
  componentWillMount : function () {
    this.id = _.uniqueId('display-item_');
  },
  hasAvatar          : function (item) {
    if (item.avatar) {
      return true
    }
  },
  render             : function () {
    let imgSrc;
    var swipeContainer = null;
    let classLine = 'display-item';
    if (this.hasAvatar(this.props.item)) {

      if (this.props.item.avatar) {
        imgSrc = avatars;
      }
    }
    if (this.props.item.swipe) {
      classLine += ' vert';
      swipeContainer = <div className="swipe-choice-container">
        <img className="swipe-choice" src={johnClick} onClick={(event) => this.props.handleEpisodeLaunch('HE')} alt="john"/>
        <img className="swipe-choice" src={sueClick} onClick={(event) => this.props.handleEpisodeLaunch('SHE')} alt="Sue"/>
      </div>
    }
    return (

      <div className={classLine} id={this.id}>
        {this.hasAvatar(this.props.item) ? <img className="avatar-intro-image" src={imgSrc}/> : null}
        <p>{this.props.msg}</p>
        {swipeContainer}
      </div>

    )
  }
});