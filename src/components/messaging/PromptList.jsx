import React from 'react';

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
          <div className="prompt" onClick={ () => {that.props.addMessage(prompt)}} key={index}><p>{prompt.prompt}</p></div>
        )}
      </div>
    )
  }
})