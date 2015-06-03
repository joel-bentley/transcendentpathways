var React = require('react');

var ApprovedEvents = React.createClass ({

    render: function(){

        return(
            <div>
                <h4>Approved Events</h4>
                {this.props.approvedEvents.length ? <h5>{this.props.approvedEvents}</h5> :
                    <div><span style={{'color': 'red'}}><h5>No approved events yet...</h5></span></div>}
            </div>
        );
    }
});

module.exports = ApprovedEvents;