/** @jsx React.DOM */
'use strict'

function getCORS(url, success) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = success;
    xhr.send();
    return xhr;
}

var React = require('react')
module.exports = React.createClass({
  getInitialState: function() {
    return {
      username: 'ronihcohen',
      lastGistUrl: ''
    };
  },

  componentDidMount: function() {
    getCORS(this.props.source, function(request){
      var result = JSON.parse(request.currentTarget.response || request.target.responseText);
      var lastGist = result[0];
      if (this.isMounted()) {
        this.setState({
          username: lastGist.owner.login,
          lastGistUrl: lastGist.html_url
        });
      }
    }.bind(this));
  },

  render: function() {
    return (
      <div>
        {this.state.username}'s last gist is
        <a href={this.state.lastGistUrl}>here</a>.
      </div>
    );
  }
});
