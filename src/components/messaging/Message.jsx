import React from 'react';
import {emojiAssign} from '../shared/media/emoji';
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
    let avatarMsg = this.props.displayAvatar ? 'avatar__msg' : '';
    let last = this.props.lastinblock ? 'last__msg' : '';
    return 'message ' + sender + ' ' + extra + ' ' + delay + ' ' + avatarMsg + ' ' + last;
  },
  indicatorClass: function() {
    let sender = this.props.sender;
    let extra = this.props.classExtra ? this.props.classExtra : '';
    let delay = this.state.longerMessageDelay ? 'textmessage' : 'hidden';
    let avatarMsg = this.props.displayAvatar ? 'avatar__msg' : '';
    let last = this.props.lastinblock ? ' last__msg' : '';
    return 'message indicator ' + sender + ' ' + extra + ' ' + delay + ' ' + avatarMsg + ' ' + last;
  },
  wrapperClass : function() {
    let sender = this.props.sender;
    let last = this.props.lastinblock ? ' last__msg' : '';
    let wrapper__class = 'message__wrapper non-user ' + sender;
    if (sender === 'user') {
      wrapper__class = 'message__wrapper ' + sender;
    }

    let visible = '';
    //IF THERE'S NO CONTENT
    if (!this.props.msg.content) {
      //RUN THE DELAY AND HIDE IT
      visible = this.state.longerMessageDelay ? ' viewable' : ' hidden';
    }
    return wrapper__class + visible + last
  },
  render : function () {
    let sender = this.props.sender;
    let displayAvatar = this.props.displayAvatar;
    let avatar;
    if (displayAvatar && sender === 'john') {
      avatar = <div className="avatar john"></div>
    } else if (displayAvatar && sender === 'sue') {
      avatar = <div className="avatar sue"></div>
    } else if (displayAvatar && sender === 'friend') {
      avatar = <div className="avatar friend"></div>
    } else if (sender === 'sue' || sender === 'john'){
      avatar = <div className="avatar non__user"></div>
    } else if (displayAvatar && sender === 'narrator') {
      avatar = <div className="avatar narrator"></div>
    }

    let messageContent = [];
    if (this.props.msg.emoji) {
      //IF WE HAVE AN ARRAY OF EMOJIS
      if (Array.isArray(this.props.msg.emoji)) {
        this.props.msg.emoji.forEach(function (emojiItem) {
          let emoji = emojiAssign(emojiItem.emoji);
          let emojiId = _.uniqueId('emoji-id_');
          messageContent.push(<img className="emoji" src={emoji} alt={emoji} key={emojiId}/>)
        });


      } else {
        //IF WE JUST HAVE ON EMOJI
        let emoji = emojiAssign(this.props.msg.emoji);
        messageContent = <p><img className="emoji" src={emoji} alt={emoji}/></p>;
      }
    } else {
      messageContent = <p>{this.props.msg.content}</p>
    }


    return (
      <div className={this.wrapperClass()} key={this.id}>
        {avatar}
        <div className={this.messageClass()}>
          {messageContent}
        </div>
        <div id="indicator" className={this.indicatorClass()}>
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