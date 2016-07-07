import React from 'react';
var _ = require('lodash');
require('../../css/messaging.css');

export default React.createClass({

  getInitialState: function() {
    return {
      longerMessageDelay: false
    }
  },
  componentWillMount: function () {
    this.id = _.uniqueId('message_');
  },
  componentDidMount: function() {
    if (!this.props.skipDelay) {
      //SET DELAY TIME TO 1SEC UNLESS SPECIFIED
      let delayTime = this.props.delayTime ? this.props.delayTime : 1000;
      this.toggleMessageDelay(true);

      var that = this;
      setTimeout(function() {
        that.toggleMessageDelay(false);
      }, delayTime); 
    }
  },

  toggleMessageDelay : function (delayBool) {
    this.setState({
      longerMessageDelay: delayBool
    })
  },
  messageClass: function() {
    let sender = this.props.sender;
    let extra = this.props.classExtra ? this.props.classExtra : '';
    let delay = this.state.longerMessageDelay ? 'hidden' : 'viewable';
    return 'message ' + sender + ' ' + extra + ' ' + delay;
  },
  wrapperClass : function() {
    let sender = this.props.sender;
    let wrapper__class = 'message__wrapper non-user ' + sender;
    if (sender === 'user') {
      wrapper__class = 'message__wrapper ' + sender;
    }
    return wrapper__class
  },
  render : function () {
    return (
      <div className={this.wrapperClass()}>
        <div className={this.messageClass()} id={this.id}>
          <p>{this.props.msg.content}</p>
        </div>
        <div id="indicator" className={'message indicator ' + (this.state.longerMessageDelay ? 'textmessage' : 'hidden')}>
          <span className="bubble">
            <i className="point"></i>
            <i className="point"></i>
            <i className="point"></i>
          </span>
        </div>
      </div>
    )
  }
});