import React from 'react';
var _ = require('lodash');

var johnAvatar = require('../../images/john_avatar.png');
var sueAvatar  = require('../../images/sue_avatar.png');
var johnSwipe  = require('../../images/swipe_choice_john.png');
var sueSwipe   = require('../../images/swipe_choice_sue.png');

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
    let avatarIdent;
    var swipeContainer = null;
    let classLine = 'display-item';
    if (this.hasAvatar(this.props.item)) {

      if (this.props.item.avatar === 'sue') {
        avatarIdent = 'avatar sue';
        imgSrc      = sueAvatar;
      } else {
        avatarIdent = 'avatar john';
        imgSrc      = johnAvatar
      }
    }
    if (this.props.item.swipe) {
      classLine += ' vert';
      swipeContainer = <div className="swipe-choice-container">
        <img className="swipe-choice" src={johnSwipe} onClick={(event) => this.props.handleEpisodeLaunch('HE')} alt="john"/>
        <img className="swipe-choice" src={sueSwipe} onClick={(event) => this.props.handleEpisodeLaunch('SHE')} alt="Sue"/>
      </div>
    }
    return (

      <div className={classLine} id={this.id}>
        {this.hasAvatar(this.props.item) ? <img className={avatarIdent} src={imgSrc} alt={avatarIdent}/> : null}
        <p className={avatarIdent}>{this.props.msg}</p>
        {swipeContainer}
      </div>

    )
  }
});