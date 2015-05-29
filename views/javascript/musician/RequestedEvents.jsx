var React = require('react');

var RequestedEvents = React.createClass ({

    render: function(){

        return(
            <div>
                <hr></hr>
                {this.props.requestedEvents}
                <hr></hr>
            </div>
        );
    }
});

module.exports = RequestedEvents;