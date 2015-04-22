var React = require('react');
var Griddle = require('griddle-react');
var Search = require('./Search.jsx');
var Results = require('./Results.jsx');

var App = React.createClass({
    render: function(){
        return (
            <div>
            <Results />
            </div>
        )
    }
});

React.render(
    <App />,
    document.getElementById('app1')
);
