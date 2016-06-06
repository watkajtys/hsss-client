import React from 'react';
var _ = require('lodash');
require('../../css/messaging.css');

export default React.createClass({
  componentWillMount: function () {
    this.id = _.uniqueId('message_');
  },
  messageClass: function() {
    console.log(this.props);
    let sender = this.props.sender;
    let extra = this.props.classExtra ? this.props.classExtra : '';
    return 'message ' + sender + ' ' + extra;
  },
  render : function () {
    return (
      <div className={this.messageClass()} id={this.id}>
        <p>{this.props.msg.content}</p>
      </div>
    )
  }
});