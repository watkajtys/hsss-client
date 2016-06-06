import React from 'react';
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
import DisplayItem from '../intro/DisplayItem';

require('../../css/intro.css');

export default React.createClass({
  getInitialState: function () {
    return {data: []}
  },
  componentDidUpdate: function() {
    if (this.props.active && !this.triggered) {
      this.triggered = true;
      this.getAndDisplayData();
    }
  },
  getAndDisplayData: function() {
    let  allMessageDecks = this.props.deck.textBlock;
    let that = this;

    function syncLoop(iterations, process, exit) {
      var index = 0,
          done = false,
          shouldExit = false;

      var loop = {
        next: function () {
          if (done) {
            if(shouldExit && exit) {
              return exit();
            }
          }

          if (index < iterations) {
            index++;
            process(loop);
          } else {
            done = true;
            if(exit) exit();
          }
        },
        iteration: function () {
          return index - 1;
        },
        break: function(end) {
          done = true;
          shouldExit = end;
        }
      };
      loop.next();
      return loop;
    }

    syncLoop(allMessageDecks.length, function(loop){
      var i = loop.iteration();
      var group = allMessageDecks[i];
      syncLoop(group.length, function(loop){
        setTimeout(function(){
          var i = loop.iteration();
          let obj = group[i];
          that.setState({data: that.state.data.concat([obj])});
          loop.next();
        }, 3000);
      }, function(){
        setTimeout(function() {
          console.log('%cNext Item %i iteration of %i', 'color: blue; font-size: 14px', i, allMessageDecks.length-1);
          if (i === allMessageDecks.length-1) {
            console.log('%cLast Item', 'color: orange; background: black;')
          } else {
            that.setState({data: []});
          }
          loop.next();

        }, 3000)
      });

    }, function(){
      console.log('done');
    });



  },
  render: function () {
    var items = this.state.data.map(function(item, i) {
      return (
        <DisplayItem msg={item.content} item={item} key={item.id}/>
      )
    }.bind(this));
    return (
      <div id="intro">
        <ReactCSSTransitionGroup transitionName="fadeIn" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
          {items}
        </ReactCSSTransitionGroup>
      </div>
    )
  }
})