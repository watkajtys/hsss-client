import React from 'react';
import Message from './messaging/Message';
import PromptList from './messaging/PromptList';

let _ = require('lodash');
require('../css/messaging.css');


export default React.createClass({
  getInitialState    : function() {
    return {data: [], prompts: []}
  },
  componentWillMount : function () {
    this.id = _.uniqueId('message-container_')
  },
  componentDidMount  : function() {

  },
  componentDidUpdate : function () {
    console.log('Are we active?', this.props.active);
    if (this.props.active && !this.triggered) {
      this.triggered = true;
      this.getMessages();
    }
  },
  getDeck            : function () {
    console.log(this.props.deck);
    return this.props.deck || [];
  },
  hasPrompt          : function () {
    return this.props.deck.reaction;
  },
  getPrompts : function () {
    console.log('%cCALLED', 'color: red; font-size: 16px');
    let prompts;
    let that = this;
    prompts = this.props.deck.reactionOptions || [];
    prompts.forEach(function (prompt) {
      that.setState({prompts: that.state.prompts.concat([prompt])});
    })

  },
  getMessages        : function () {
    let messages = [];
    let display = [];
    let displayInterval = 2500;
    messages     = this.props.deck.messages || null;
    // if (this.props.deck.messageFollowUps) {
    //   messages = this.props.deck.messageFollowUp;
    // } else {
    //   messages = this.props.deck.messages || [];
    // }
    console.log(messages, 'messages');
    let that = this;
    var count=0;
    if (messages) {
      let timer = setInterval(function() {
        console.log('%cStarted %s deck is active', 'color: yellow; background: black;', that.props.deck.deck);
        let obj = messages[count];
        that.setState({data: that.state.data.concat([obj])});
        count++;
        console.log(count, messages.length);
        if (count >= messages.length) {
          clearInterval(timer);
          setTimeout(function() {
            that.getPrompts();
          }, displayInterval);
        }
      }, displayInterval);
    }
  },
  addMessage : function(message) {
    let that = this;
    this.setState({prompts: []});
    if (message.prompt) {
      let obj = {
        sender: 'user',
        content: message.prompt,
        skipDelay: true
      };
      that.setState({data: that.state.data.concat([obj])});
    }
    if (message.loadMore) {

      var count=0;
      if (message.messagesToLoad) {
        let timer2 = setInterval(function() {
          console.log('%cStarted %s deck is active', 'color: yellow; background: black;', that.props.deck.deck);
          let obj = message.messagesToLoad[count];
          that.setState({data: that.state.data.concat([obj])});
          count++;
          console.log(count, message.messagesToLoad.length);
          if (count >= message.messagesToLoad.length) {
            console.log('%cSHOULD NUKE at %d', 'color:orange', count);
            clearInterval(timer2);
            setTimeout(function() {
              if (message.additionalPrompt) {
                that.setState({prompts: [{prompt: message.promptFollowUp[0].prompt}]});
              }
            }, 2500);
          }
        }, 2500);
      }
    }
    // this.setState({data: this.state.data.concat([message])});
  },
  messageClass : function () {
    let extra = this.props.classExtra ? this.props.classExtra : '';
    return 'messaging-container ' + extra;
  },
  render             : function () {
    return (
      <div className={this.messageClass()} id={this.id}>
        {this.state.data.map(message =>
          <Message msg={message} sender={message.sender} skipDelay={message.skipDelay} delayTime={message.delayTime}/>
        )}
        <PromptList prompts={this.state.prompts} addMessage={this.addMessage}/>
      </div>
    )
  }
})