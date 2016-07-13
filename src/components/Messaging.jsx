import React from 'react';
import assign from 'deep-assign';
import Message from './messaging/Message';
import PromptList from './messaging/PromptList';

let _ = require('lodash');
require('../css/messaging.css');


export default React.createClass({
  getInitialState     : function () {
    return {data : [], prompts : []}
  },
  componentWillMount  : function () {
    this.id = _.uniqueId('message-container_')
  },
  componentDidMount   : function () {
    this.getMessages();
  },
  componentDidUpdate  : function () {
    console.log('Are we active?', this.props.active);
    if (this.props.active && !this.triggered) {
      this.triggered = true;
      this.getMessages();
    }
  },
  getDeck             : function () {
    console.log(this.props.deck);
    return this.props.deck || [];
  },
  hasPrompt           : function () {
    return this.props.deck.reaction;
  },
  getPrompts          : function () {
    console.log('%cCALLED Prompts', 'color: red; font-size: 16px');
    let prompts;
    let that = this;
    prompts  = this.props.deck.reactionOptions || [];
    prompts.forEach(function (prompt) {
      that.setState({prompts : that.state.prompts.concat([prompt])});
    })

  },
  getMessages         : function () {
    let messages        = [];
    let display         = [];
    let displayInterval = 2500;
    messages            = this.props.deck.messages || null;

    console.log(this.props.deck, 'MESSAGES FROM PROPS')


    let that  = this;
    var count = 0;
    if (messages) {
      // console.log(messages, messages.length);
      // //FIRST RUN - POST FIRST MESSAGE WITHOUT DELAY
      // let obj = messages[count];
      // that.setState({data: that.state.data.concat([obj])});
      // if (count < messages.length) {
      //
      // } else {
      //   that.getPrompts();
      // }
      this.executeMessaging(messages);
      // let timer = setInterval(function() {
      //   console.log('%cStarted %s deck is active', 'color: yellow; background: black;', that.props.deck.deck);
      //   let obj = messages[count];
      //   that.setState({data: that.state.data.concat([obj])});
      //   count++;
      //   console.log(count, messages.length);
      //   if (count >= messages.length) {
      //     clearInterval(timer);
      //     setTimeout(function() {
      //       that.getPrompts();
      //     }, displayInterval);
      //   }
      // }, displayInterval);
    } else {
      console.log('NO MESSAGES')
    }
  },
  runMessagingPromise : function (messageArray) {
    console.log(messageArray, 'MESSAGE ARRAY');
    var deferred = $.Deferred();

    var i        = 0;
    var that     = this;
    var nextStep = function () {
      if (i < messageArray.length) {
        // Do something
        var delay = messageArray[i].delay ? messageArray[i].delay : 2000;
        let obj   = messageArray[i];
        obj.last  = true;
        obj.delay = delay;
        that.setState({data : that.state.data.concat([obj])});
        setTimeout(nextStep, delay);
        i++;
      }
      else {
        deferred.resolve(i);
      }
    };
    nextStep();
    return deferred.promise();
  },
  executeMessaging    : function (messageArray, prompts) {
    var that    = this;
    var promise = this.runMessagingPromise(messageArray);
    promise.then(function (result) {
      if (prompts) {
        that.setState({prompts : [{prompt : prompts}]});
      } else {
        that.getPrompts();
      }
    });
  },
  addMessage          : function (message) {
    this.setState({prompts : []});
    let that = this;
    console.log(message, 'add message');
    if (message.prompt) {
      let obj = {
        sender    : 'user',
        content   : message.prompt,
        skipDelay : true
      };
      this.setState({data : this.state.data.concat([obj])});

      if (message.loadMore) {
        if (message.messagesToLoad) {
          setTimeout(function () {
            if (message.additionalPrompt) {
              that.executeMessaging(message.messagesToLoad, message.promptFollowUp[0].prompt);
            } else {
              that.executeMessaging(message.messagesToLoad);
            }

          }, 500);
        }
      }
    }


    // var count=0;
    // if (message.messagesToLoad) {
    //   let timer2 = setInterval(function() {
    //     console.log('%cStarted %s deck is active', 'color: yellow; background: black;', that.props.deck.deck);
    //     let obj = message.messagesToLoad[count];
    //     that.setState({data: that.state.data.concat([obj])});
    //     count++;
    //     console.log(count, message.messagesToLoad.length);
    //     if (count >= message.messagesToLoad.length) {
    //       console.log('%cSHOULD NUKE at %d', 'color:orange', count);
    //       clearInterval(timer2);
    //       setTimeout(function() {
    //         if (message.additionalPrompt) {
    //           that.setState({prompts: [{prompt: message.promptFollowUp[0].prompt}]});
    //         }
    //       }, 2500);
    //     }
    //   }, 2500);
    // }

    // this.setState({data: this.state.data.concat([message])});
  },
  messageClass        : function () {
    let extra = this.props.classExtra ? this.props.classExtra : '';
    return 'messaging-container ' + extra;
  },
  render              : function () {
    return (
      <div className={this.messageClass()} key={this.id}>
        {this.state.data.map(message =>
          <Message msg={message} sender={message.sender} skipDelay={message.skipDelay} delayTime={message.delayTime} displayAvatar={message.displayAvatar} lastinblock= {message.lastMsgInBlock}/>
        )}
        <PromptList prompts={this.state.prompts} addMessage={this.addMessage}/>
      </div>
    )
  }
})