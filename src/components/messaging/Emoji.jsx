import React from 'react';
import {emojiAssign} from '../shared/media/emoji';
var _ = require('lodash');
var classNames = require('classnames');


export default React.createClass({

  getInitialState : function () {
    return {
      disabled   : false,
      clickCount : 0
    }
  },

  componentWillMount : function () {
    this.messageToAdd = {
      emojiboard : true,
      emoji : this.props.emoji.emoji,
      value : this.props.emoji.value
    };

    this.emoji = emojiAssign(this.props.emoji.emoji);
  },

  processClick : function (func) {
    if (this.messageToAdd.emoji === 'enter') {
      //IF IT'S THE ENTER BUTTON
      this.messageToAdd.enterButton = true;
      func(this.messageToAdd);
    }

    if (this.props.allowSelection && !this.state.disabled) {
      //IF THE EMOJI CAN BE CLICKED AND EMOJI BOARD ALLOWS IT
      func(this.messageToAdd);
      this.setState({clickCount : this.state.clickCount += 1});

      if (this.state.clickCount >= 3) {
        this.setState({disabled : true});
      }
    }
  },

  render : function () {
    var emojiClass = classNames({
      'prompt': true,
      'emoji': true,
      'alreadyselected': this.state.disabled
    });
    let promptContent;
    promptContent = <p><img className="emoji" src={this.emoji} alt={this.props.emoji.emoji}/></p>;

    return (
      <div className={emojiClass} onClick={ () => {this.processClick(this.props.addMessage)}}>{promptContent}</div>
    )
  }
})