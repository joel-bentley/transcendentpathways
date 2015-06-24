var React = require('react');

var ApprovedEvents = React.createClass ({

    render: function(){
        //console.log(this.props.approvedEvents);
        return(
            <div>
                <h4>Approved Events</h4>
                {this.props.approvedEvents ? <h5>{this.props.approvedEvents}</h5> :
                    <div><span style={{'color': 'red'}}><h5>No approved events yet...</h5></span></div>}
            </div>
        );
    }
});

module.exports = ApprovedEvents;