var React = require('react');
var Search = require('./Search.jsx');
var Results = require('./Results.jsx');

var App = React.createClass({
    render: function(){
        return (
            <div id="app1">
                <div className="container">
                    <div className="row">
                        <Search />
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <Results />
                    </div>
                </div>
            </div>
        )
    }
});

React.render(
    <App />,
    document.getElementById('app1')
);
