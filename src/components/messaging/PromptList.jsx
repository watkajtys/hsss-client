import React from 'react';
import Prompt from './Prompt';

var _          = require('lodash');
var classNames = require('classnames');

export default React.createClass({
  componentWillMount: function () {
    this.id = _.uniqueId('prompt-list_');
    this.promptLineId = _.uniqueId('prompt-line-id_');
  },
  componentDidMount: function () {
    console.log(this.props.messages, 'MOUNTED');
  },
  render : function () {
    var promptClass = classNames({
      'prompt-line': true,
      'visible': this.props.prompts.length > 0,
      'ios' : !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)

  });
    return (
      <div className={promptClass} key={this.promptLineId}>
        {this.props.prompts.map((prompt, index) =>
          <Prompt prompt={prompt} key={index} addMessage={this.props.addMessage}/>
        )}
      </div>
    )
  }
})