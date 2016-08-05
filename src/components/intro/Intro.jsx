import React from 'react';
import { connect } from 'react-redux';
import store from '../shared/store';
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
import DisplayItem from '../intro/DisplayItem';

require('../../css/intro.css');

const Intro = React.createClass({
  getInitialState   : function () {
    return {data: []}
  },
  componentDidMount : function() {

    if (this.props.activeSlide === this.props.deck.slide && !this.triggered) {
      this.triggered = true;
      this.getAndDisplayData();
      const isIntro = {
        type: 'HEADER_VISIBILITY',
        visible: false
      };
      store.dispatch(isIntro);
    }
  },
  pickEpisode       : function (launchSide) {
    // THIS CODE WILL EVENTUALLY LAUNCH THE EPISODE CONTAINER
    // IN THIS CASE: DECK D3 FOR JOHN/SUE SWIPER CONTAINER
    const action = {
      type       : 'LAUNCH_EPISODE',
      episode    : this.props.episode,
      launchSide : launchSide
    };
    store.dispatch(action);
    this.launchEpisode();
  },
  launchEpisode     : function () {
    const action = {
      type: 'CHANGE_SLIDE',
      activeSlide: this.props.deck.episodeToStart
    };
    store.dispatch(action);
  },
  getAndDisplayData : function() {
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
        var i = loop.iteration();
        let obj = group[i];
        that.setState({data: that.state.data.concat([obj])});
        setTimeout(function(){
          loop.next();
        }, 2500);
      }, function(){

        console.log('%cNext Item %i iteration of %i', 'color: blue; font-size: 14px', i, allMessageDecks.length-1);
        if (i === allMessageDecks.length-1) {
          console.log('%cLast Item', 'color: orange; background: black;');
          //LAST ITERATION SO TRIGGER NEXT SLIDE
          // that.pickEpisode();
        } else {
          that.setState({data: []});
        }
        setTimeout(function() {
          loop.next();
        }, 2500)
      });

    }, function(){
      console.log('done');
    });



  },
  render            : function () {
    var items = this.state.data.map(function(item, i) {
      return (
        <DisplayItem msg={item.content} item={item} key={i} episode={this.props.episode} launchSide={this.props.launchSide} handleEpisodeLaunch={this.pickEpisode}/>
      )
    }.bind(this));
    return (
      <div id="intro">
        <ReactCSSTransitionGroup transitionName="fadeIn" transitionEnterTimeout={500} transitionLeaveTimeout={1000}>
          {items}
        </ReactCSSTransitionGroup>
      </div>
    )
  }
});

const mapStateToProps = function (store) {
  return {
    episode    : store.episodeState.episode,
    launchSide : store.episodeState.launchSide
  }
};

export default connect(mapStateToProps)(Intro);