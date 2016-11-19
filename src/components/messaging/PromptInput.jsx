import React from 'react';
var updateEntry = require('../../functions/updateEntry').updateEntry;

var _          = require('lodash');
var classNames = require('classnames');

export default React.createClass({

  getInitialState    : function () {
    return {
      value  : '',
      hidden : false
    }
  },
  componentWillMount : function () {
    this.id           = _.uniqueId('prompt-list_');
    this.promptLineId = _.uniqueId('prompt-line-id_');
  },

  handleChange(event) {
    //LIMIT TO TWITTER LENGTH
    this.setState({value : event.target.value.substr(0, 140)});
  },

  handleSubmit(event) {
    //NEED TO GRAB THE PROVIDED PROMPT
    let prompt    = this.props.prompts[0];
    //OVERWRITE THE PROMPT'S PROMPT CONTENT FIELD
    prompt.prompt = this.state.value;
    //SEND IT
    this.props.addMessage(prompt);
    let dataObj = {};
    if (this.props.trackingSchema.schema) {
      //SCHEMA PROVIDED
      let tracking = this.props.trackingSchema.schema;
      dataObj[tracking] = this.state.value;
    } else if (this.props.trackingSchema.email) {
      //OTHERWISE THIS IS AN EMAIL
      dataObj.emailAddress = this.state.value;
      dataObj.emailProvidedFrom = this.props.trackingSchema.source;
    }
    if (this.state.value) {
      updateEntry(dataObj);
    }
    this.setState({value : ''});
    this.setState({hidden: true});
  },
  render : function () {
    var promptClass = classNames({
      'prompt-line input' : true,
      'visible'           : this.props.prompts.length > 0 && !this.state.hidden
    });

    var standbyClass = classNames({
      'prompt-standby input' : true,
      'visible': this.state.value.length > 0
    });
    return (
      <div>
        <div className={standbyClass}>
          <p>{this.state.value}</p>
        </div>
        <div className={promptClass} key={this.promptLineId}>
          <input type="text" value={this.state.value} onChange={this.handleChange}/><div className="prompt input" onClick={ () => {this.handleSubmit()}}><div className="enter-btn">Send</div></div>
        </div>
      </div>
    )
  }
})