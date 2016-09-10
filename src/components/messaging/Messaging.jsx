import React from 'react';
import {connect} from 'react-redux';
import store from '../shared/store';
import assign from 'deep-assign';
import Message from './Message';
import PromptList from './PromptList';

let _ = require('lodash');
require('../../css/messaging.css');


export default React.createClass({
  getInitialState     : function () {
    return {data : [], prompts : []}
  },
  componentWillMount  : function () {
    this.id       = _.uniqueId('message-container_');
    this.promptId = _.uniqueId('prompt-container_');
  },
  componentDidMount   : function () {
    console.log('Are we active? Mount', this.props.active);
    if (this.props.active && !this.triggered) {
      this.triggered = true;
      this.getMessages();
    }
  },
  componentDidUpdate  : function () {
    console.log('Are we active? Update', this.props.active);
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
    let messages = [];
    messages = this.props.deck.messages || null;

    console.log(this.props.deck, 'MESSAGES FROM PROPS');
    if (messages) {
      this.executeMessaging(messages);
    } else {
      console.log('NO MESSAGES')
    }
  },
  runMessagingPromise : function (messageArray) {
    //RUNNING MESSAGING AS PROMISE
    var deferred = $.Deferred();
    var i        = 0;
    var that     = this;
    var nextStep = function () {
      if (i < messageArray.length) {
        //STEP THROUGH MESSAGES - POSTING THEM TO STATE
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
  executeMessaging    : function (messageArray, prompts, lastAction) {
    var that    = this;
    //MAKE A PROMISE AND RUN MESSAGING
    var promise = this.runMessagingPromise(messageArray);
    promise.then(function (result) {
      //WHAT WAS THE LAST MESSAGE IN THE ARRAY?
      var lastMessage = messageArray[result - 1];

      if (lastMessage.slideLoad) {
        //IF THE LAST MESSAGE IS SUPPOSED TO TRIGGER A SLIDE TRANSITION
        //DO THAT
        setTimeout(function () {
          if (that.props.parentContainer === that.props.activeContainer) {
            let regexMatch = /.+?./;
            let parent = lastMessage.slideToLoad.match(regexMatch);
            const action = {
              type        : 'CHANGE_SLIDE',
              activeSlide : lastMessage.slideToLoad,
              activeParent : parent[0]
            };
            store.dispatch(action);
          }
        }, 1000);
      } else {
        //OTHERWISE PROCESS PROMPTS IF THERE ARE ANY
        if (prompts) {
          console.log('more prompts!', prompts);
          prompts.forEach(function (prompt) {
            console.log(prompt);
            that.setState({prompts : that.state.prompts.concat([prompt])});
          })
        } else {
          that.getPrompts();
        }
      }
    });
  },
  addMessage          : function (message) {
    //CALLED BY CLICKING A PROMPT
    this.setState({prompts : []});
    let that = this;
    console.log(message, 'add message');
    if (message.prompt) {
      let obj = {
        sender    : 'user',
        content   : message.prompt,
        skipDelay : true
      };
      //IF WE HAVE AN EMOJI - ADD TO OBJECT
      if (message.emoji) {
        obj.emoji = message.emoji;
      }
      this.setState({data : this.state.data.concat([obj])});

      if (message.slideLoad) {
        //IF MESSAGE IS SUPPOSED TO CALL A NEW SLIDE AFTER GETTING ADDED
        setTimeout(function () {
          if (that.props.parentContainer === that.props.activeContainer) {
            let regexMatch = /.+?./;
            let parent = message.slideToLoad.match(regexMatch);
            const action = {
              type        : 'CHANGE_SLIDE',
              activeSlide : message.slideToLoad,
              activeParent: parent[0]
            };
            store.dispatch(action);
          }
        }, 750);
      } else if (message.loadAdditionalSlides) {
        if (message.slidesToLoad) {

        }
      } else {
        //NO NEW SLIDE IS GETTING ADDED - CARRY ON AND DO THINGS
        if (message.loadMore) {
          if (message.messagesToLoad) {
            setTimeout(function () {
              if (message.additionalPrompt) {
                //EXECUTE MESSAGING WITH PROMPTS
                that.executeMessaging(message.messagesToLoad, message.promptFollowUp);
              } else {
                //EXECUTE MESSAGING NORMALLY
                that.executeMessaging(message.messagesToLoad);
              }

            }, 1000);
          }
        }
      }
    }
  },
  messageClass        : function () {
    let extra = this.props.classExtra ? this.props.classExtra : '';
    return 'messaging-container ' + extra;
  },
  render              : function () {
    return (
      <div className={this.messageClass()} key={this.id}>
        {this.state.data.map((message, index) =>
          <Message msg={message} sender={message.sender} skipDelay={message.skipDelay} delayTime={message.delayTime}
                   displayAvatar={message.displayAvatar} lastinblock={message.lastMsgInBlock} key={index}/>
        )}
        <PromptList prompts={this.state.prompts} addMessage={this.addMessage} key={this.promptId}/>
      </div>
    )
  }
})