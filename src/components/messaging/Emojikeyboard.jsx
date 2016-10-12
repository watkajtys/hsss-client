import React from 'react';
import Emoji from './Emoji';

var _          = require('lodash');
var classNames = require('classnames');

export default React.createClass({
  getInitialState : function () {
    return {
      emojiCount : 0,
      allowSelection : true,
      overallValue : 0
    }
  },

  componentWillMount: function () {
    this.id = _.uniqueId('prompt-list_');
    this.promptLineId = _.uniqueId('prompt-line-id_');

    this.emojiboard = [
      {
        emoji : 'super_happy',
        value: 1
      },
      {
        emoji : 'tear',
        value : -1
      },
      {
        emoji : 'bolt_face',
        value : 1
      },
      {
        emoji : 'o_face',
        value : 0
      },
      {
        emoji : 'love_eyes',
        value : 1
      },
      {
        emoji : 'hug',
        value : 1
      },
      {
        emoji : 'hundred',
        value : 1
      },
      {
        emoji : 'appreciation',
        value : 0
      },
      {
        emoji : 'thumbs_up',
        value : 1
      },
      {
        emoji : 'okay',
        value : 0
      },
      {
        emoji : 'thumbs_down',
        value : -1
      },
      {
        emoji : 'nope',
        value : -1
      },
      {
        emoji : 'celebration',
        value : 1
      },
      {
        emoji : 'heart',
        value : 1
      },
      {
        emoji : 'broken_heart',
        value : -1
      },
      {
        emoji : 'fuego',
        value : 0
      },
      {
        emoji : 'shitty',
        value : 0
      },
      {
        emoji : 'enter',
        value : '0',
        enterButton: true
      }
    ];
  },

  componentDidMount: function () {
    console.log(this.props.messages, 'MOUNTED');
  },

  messagingSystem: function (messageToAdd) {

    if (messageToAdd.enterButton) {
      //IF ENTER HAS BEEN CLICKED
      //PASS THE OVERALL VALUE UP THE CHAIN
      messageToAdd.overallValue = this.state.overallValue;
      this.props.addMessage(messageToAdd);

    } else {

      if (this.state.emojiCount <= 3) {

        this.props.addMessage(messageToAdd);
        this.setState({emojiCount: this.state.emojiCount + 1});
        this.setState({overallValue : this.state.overallValue + messageToAdd.value});

        if (this.state.emojiCount == 3) {this.setState({allowSelection : false});}

      } else {
        this.setState({allowSelection : false});
      }
    }

  },

  render : function () {
    var promptClass = classNames({
      'prompt-line emoji': true,
      'visible': this.props.prompts.length > 0
    });

    return (

      <div className={promptClass} key={this.promptLineId}>
        {this.emojiboard.map((emoji, index) =>
          <Emoji emoji={emoji} key={index} addMessage={this.messagingSystem} allowSelection={this.state.allowSelection} prompts={this.props.prompts}/>
        )}
      </div>
    )
  }
})