import React from 'react';
import {emojiAssign} from '../shared/media/emoji';
var _ = require('lodash');


export default React.createClass({
  render : function () {
    let promptContent;
    let emoji = emojiAssign(this.props.emoji.emoji);
    promptContent = <p><img className="emoji" src={emoji} alt={this.props.emoji.emoji}/></p>;

    var messageToAdd = {
      emojiboard : true,
      emoji : this.props.emoji.emoji,
      value : this.props.emoji.value
    };

    return (
      <div className="prompt emoji" onClick={ () => {this.props.addMessage(messageToAdd)}}>{promptContent}</div>
    )
  }
})