import React from 'react';

var _ = require('lodash');

export default React.createClass({
  componentWillMount: function () {
    this.id = _.uniqueId('prompt-list_');
  },
  componentDidMount: function () {
    console.log(this.props.messages, 'MOUNTED');
  },
  render : function () {
    var that = this;
    console.log(that, 'THAT');
    return (
      <div className="prompt-line">
        {that.props.prompts.map(prompt =>
          <div className="prompt" onClick={ () => {that.props.addMessage(prompt)}}><p>{prompt.prompt}</p></div>
        )}
      </div>
    )
  }
})