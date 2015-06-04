var React = require('react');

var EventRow = React.createClass({

    render: function(){
        return(
            <div className="panel panel-primary" key={event._id}>
                <div className="panel-heading">
                    <h4 className="panel-title"> {this.props.event.facilityName + ' on ' +
                    new Date(this.props.event.startTime).toDateString()} </h4>
                </div>
                <div className="panel-body">
                    <div >Start Date: {new Date(this.props.event.startTime).toDateString()}</div>
                    <div>Facility Name: {this.props.event.facilityName}</div>
                    <div>Start Time: {new Date(this.props.event.startTime).toLocaleTimeString()}</div>
                    <div>End Time: {new Date(this.props.event.endTime).toLocaleTimeString()}</div>
                    <div>Zipcode: {this.props.facility.zipcode}</div>
                </div>
            </div>
        )
    }
});

module.exports = EventRow;