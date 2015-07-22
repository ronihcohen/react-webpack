/** @jsx React.DOM */
'use strict';

function getCORS(url, success) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = success;
    xhr.send();
    return xhr;
}

var React = require('react');
module.exports = React.createClass({
  getInitialState: function() {
    return {
      result: []
    };
  },

  componentDidMount: function() {
    getCORS(this.props.source, function(request){
        if (this.isMounted()) {
            this.setState({
                result : JSON.parse(request.currentTarget.response || request.target.responseText)
            });
        }
    }.bind(this));
  },

  render: function() {
    return (<div>
      { this.state.result.map(function(item) {
        return <div key={item.id}>{item.created_at}</div>
      })
      }
    </div>);
  }
});
