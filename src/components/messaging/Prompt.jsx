import React from 'react';
import {emojiAssign} from '../shared/media/emoji';
var _ = require('lodash');


export default React.createClass({
  render : function () {
    let promptContent;
    if (this.props.prompt.emoji) {
      let emoji = emojiAssign(this.props.prompt.emoji);
      promptContent = <p><img className="emoji" src={emoji} alt={emoji}/></p>;
    } else {
      promptContent = <p>{this.props.prompt.prompt}</p>
    }

    return (
      <div className="prompt" onClick={ () => {this.props.addMessage(this.props.prompt)}}>{promptContent}</div>
    )
  }
})