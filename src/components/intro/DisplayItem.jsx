import React from 'react';
var _ = require('lodash');

var johnAvatar   = require('../../images/john_avatar.png');
var sueAvatar    = require('../../images/sue_avatar.png');
var swipeGraphic = require('../../images/swipe_choice.png');

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
      imgSrc = swipeGraphic;
      classLine+= ' vert';
    }
    return (

      <div className={classLine} id={this.id}>
        {this.hasAvatar(this.props.item) ? <img className={avatarIdent} src={imgSrc} alt={avatarIdent}/> : null}
        <p className={avatarIdent}>{this.props.msg}</p>
        {this.props.item.swipe ? <img className="swipe-choice" src={imgSrc}/> : null}
      </div>

    )
  }
});