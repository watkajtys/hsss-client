import React from 'react';
import Prompt from './Prompt';

var _ = require('lodash');

export default React.createClass({
  componentWillMount: function () {
    this.id = _.uniqueId('prompt-list_');
    this.promptLineId = _.uniqueId('prompt-line-id_');
  },
  componentDidMount: function () {
    console.log(this.props.messages, 'MOUNTED');
  },
  render : function () {
    var that = this;
    return (
      <div className="prompt-line" key={this.promptLineId}>
        {that.props.prompts.map((prompt, index) =>
          <Prompt prompt={prompt} key={index} addMessage={this.props.addMessage}/>
        )}
      </div>
    )
  }
})