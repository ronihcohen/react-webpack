/** @jsx React.DOM */
'use strict'
require("./style.css");
var React = require('react')
var UserGist = require('./Hello')
React.render(
  <UserGist source="https://api.github.com/users/octocat/gists" />,
  document.getElementById('content')
);
