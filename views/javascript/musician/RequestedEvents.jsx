var React = require('react');

var RequestedEvents = React.createClass ({

    render: function(){

        return(
            <div>
                <h4>Requested Events</h4>
                {this.props.requestedEvents? <h5>{this.props.requestedEvents}</h5> :
                    <div><span style={{'color': 'red'}}><h5>No requested events yet...</h5></span></div>}
            </div>
        );
    }
});

module.exports = RequestedEvents;