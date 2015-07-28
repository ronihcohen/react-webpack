/** @jsx React.DOM */
'use strict';
var React = require('react');
module.exports = React.createClass({
    render: function() {
        var config = this.props.config;
        var data = this.props.data;
        var poster;
        if (data.poster_path) {
            poster = <img src={config.images.base_url+'w92'+data.poster_path} alt=""/>;
        } else {
            poster = <img src='http://placehold.it/92x180'/>;
        }

        return  (<div>
                    {data.original_title} <br/>
                    {poster}
                </div>)
    }
});
