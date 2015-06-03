var React = require('react');
var EventRow = require('./EventRow.jsx');
var EventHeader = require('./EventHeader.jsx');

var DetailEvents = React.createClass({

    render: function(){
        return(
            <div>
                <EventHeader />
            </div>
        )
    }
});

module.exports = DetailEvents;