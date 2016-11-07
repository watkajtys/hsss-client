import React from 'react';
import {connect} from 'react-redux';
import store from '../shared/store';
import assign from 'deep-assign';
import Message from './Message';
import PromptList from './PromptList';
import EmojiBoard from './Emojikeyboard';


let _ = require('lodash');
require('../../css/messaging.css');


export default React.createClass({
  getInitialState     : function () {
    return {data : [], prompts : []}
  },
  componentWillMount  : function () {
    this.id       = _.uniqueId('message-container_');
    this.promptId = _.uniqueId('prompt-container_');

    //SETTING THE EMOJI RESPONSE TO TRUE
    //USED TO CONCAT EMOJIS INTO EMOJI RESPONSE MSG
    this.emojiResponse = false;
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

  processPrompt : function(prompt) {
    let that = this;
    if (prompt.slideLoad) {
      //IF MESSAGE IS SUPPOSED TO CALL A NEW SLIDE AFTER GETTING ADDED
      setTimeout(function () {
        if (that.props.parentContainer === that.props.activeContainer) {
          //REGEX TO GET THE PARENT SLIDE NUMBER (between the two ie: 7.1)
          let regexMatch = /\b([^.]+).([^.]+)\b/;
          let parent = prompt.slideToLoad.match(regexMatch);
          const action = {
            type        : 'CHANGE_SLIDE',
            activeSlide : prompt.slideToLoad,
            activeParent: parent[0]
          };
          store.dispatch(action);
        }
      }, 750);
    } else {
      //NO NEW SLIDE IS GETTING ADDED - CARRY ON AND DO THINGS
      if (prompt.loadMore) {
        if (prompt.messagesToLoad) {
          setTimeout(function () {
            if (prompt.additionalPrompt) {
              //EXECUTE MESSAGING WITH PROMPTS
              that.executeMessaging(prompt.messagesToLoad, prompt.promptFollowUp);
            } else {
              //EXECUTE MESSAGING NORMALLY
              that.executeMessaging(prompt.messagesToLoad);
            }

          }, 1000);
        }
      }
    }
  },
  findAndReturnPrompt : function (prompts, toFind) {
    //LOOP THROUGH THE PROMPTS UNTIL WE FIND WHAT WE ARE LOOKING FOR
    //INCLUDES WILL FIND ITEM DEEP IN OBJECT
    var i;
    for (i = 0; i < prompts.length; i++) {
      if (_.includes(prompts[i].prompt, toFind)) {
        return prompts[i]
      }
    }
  },

  addMessage          : function (message) {
    //CALLED BY CLICKING A PROMPT
    let that = this;

    if (message.prompt) {
      this.setState({prompts : []});
      let obj = {
        sender         : 'user',
        content        : message.prompt,
        lastMsgInBlock : true,
        skipDelay      : true
      };
      //IF WE HAVE AN EMOJI - ADD TO OBJECT
      if (message.emoji) {
        obj.emoji = message.emoji;
      }
      this.setState({data : this.state.data.concat([obj])});
      this.processPrompt(message);
    }
    if (message.emojiboard) {
      console.log('FROM THE BOARD', message);
      //MESSAGE COMING FROM THE EMOJIBOARD

      if (message.enterButton) {

        var obj = {
          sender    : 'user',
          content   : message.prompt,
          skipDelay : true
        };
        //IF WE HAVE AN EMOJI - ADD TO OBJECT
        if (message.emoji) {
          obj.emoji = message.emoji;
          obj.content = message.emoji;
        }

        if (message.emojis) {
          obj.emoji = message.emojis;
          obj.content = message.emojis;
        }

        this.setState({data : this.state.data.concat([obj])});

        //IF THE ENTER BUTTON ON THE KEYBOARD WAS CLICKED...
        var foundPrompt;
        //FIND THE RIGHT PROMPT BASED ON CALCULATED VALUE
        if (message.overallValue < 0) {
          //IF THE VALUE IS LESS THAN 0 - NEGATIVE
          foundPrompt = this.findAndReturnPrompt(this.state.prompts, 'negative');
        } else if (message.overallValue == 0) {
          //IF THE VALUE IS ZERO - NEUTRAL
          foundPrompt = this.findAndReturnPrompt(this.state.prompts, 'neutral');
        } else {
          //IF THE VALUE IS GREATER THAN 0 - POSITIVE
          foundPrompt = this.findAndReturnPrompt(this.state.prompts, 'positive');
        }
        this.processPrompt(foundPrompt);

      } else {

        if (!this.emojiResponse) {
          //CONCAT THAT OBJECT TO THE STATE
          this.setState({data : this.state.data.concat([obj])});
        }
      }
    }
  },
  messageClass        : function () {
    let extra = this.props.classExtra ? this.props.classExtra : '';
    return 'messaging-container ' + extra;
  },

  render : function () {
    var prompter;
    if (this.props.deck.reaction && this.props.deck.reactionType === 'buttons') {
      prompter = <PromptList prompts={this.state.prompts} addMessage={this.addMessage} type={this.props.deck.reactionType} key={this.promptId}/>
    } else if (this.props.deck.reaction && this.props.deck.reactionType === 'emojikeyboard') {
      prompter = <EmojiBoard prompts={this.state.prompts} addMessage={this.addMessage} type={this.props.deck.reactionType} key={this.promptId}/>
    }

    return (
      <div className={this.messageClass()} key={this.id}>
        {this.state.data.map((message, index) =>
          <Message msg={message} sender={message.sender} skipDelay={message.skipDelay} delayTime={message.delayTime}
                   displayAvatar={message.displayAvatar} lastinblock={message.lastMsgInBlock} key={index}/>
        )}
        {prompter}
      </div>
    )
  }
})