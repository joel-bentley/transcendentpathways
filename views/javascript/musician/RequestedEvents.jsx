var React = require('react');

var RequestedEvents = React.createClass ({

    render: function(){

        return(
            <div>
                Requested Events
                <h5>{this.props.requestedEvents}</h5>
            </div>
        );
    }
});

module.exports = RequestedEvents;