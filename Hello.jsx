/** @jsx React.DOM */
'use strict';

function getCORS(url, success) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = (request) => {
        var data = JSON.parse(request.currentTarget.response || request.target.responseText);
        success(data)
    };
    xhr.send();
    return xhr;
}

function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

var Movie = require('./Movie');

var React = require('react');
module.exports = React.createClass({
    getInitialState: () => ({
        results: [],
        api_key: '569893c0c3c52bc09f61d1623d11fac9',
        api_url: 'http://api.themoviedb.org/3/',
        search: '',
        config: ''
    }),

    componentDidMount: function () {
        if (this.isMounted()) {
            getCORS(this.state.api_url + 'configuration?api_key=' + this.state.api_key, (config)=> {
                this.setState({
                    config: config
                });
                this.getPopularMovies();
            });
        }
        this.getPopularMovies = () => {
            getCORS(this.state.api_url + 'movie/popular?api_key=' + this.state.api_key, (data)=> {
                this.setState({
                    results: data.results
                });
            });
        };
        this.search = debounce((query) => {
            if (query){
                getCORS(this.state.api_url + 'search/movie?query='+query+'&api_key=' + this.state.api_key, (data)=> {
                    this.setState({
                        results: data.results
                    });
                });
            } else {
                this.getPopularMovies();
            }
        }, 1000);
    },
    handleChange: function(event) {
        var query = event.target.value;
        this.search(query);
    },

    render: function () {
        return  <div>
                    <input type="text"  onChange={this.handleChange} />
                    { this.state.results.map((item) => {
                        return <Movie data={item} key={item.id} config={this.state.config}/>
                    })}
                </div>
    }
});
