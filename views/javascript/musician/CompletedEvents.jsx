var React = require('react');

var CompletedEvents = React.createClass ({

    render: function(){

        return(
            <div>
                <h4>Completed Events</h4>
                {this.props.completedEvents.length ? <h5>{this.props.completedEvents}</h5> :
                    <div><span style={{'color': 'red'}}><h5>No events completed yet...</h5></span></div>}
            </div>
        );
    }
});

module.exports = CompletedEvents;