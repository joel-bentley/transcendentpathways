var React = require('react');

var EventCard = React.createClass({

    componentDidMount: function(){
        this.props.getFacilityInfo(this.props.event.facilityName)
    },
    render: function() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <div className="panel-title">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-xs-7">
                                    <span style={{color: 'blue'}}>
                                        <h5>{this.props.event.facilityName}</h5>
                                    </span>
                                </div>
                                <div className="col-xs-5">
                                    <span style={{color: 'indigo'}}>
                                        <h5>{new Date(this.props.event.startTime).toDateString()}</h5>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="panel-body">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xs-6">
                                <h5>Start: {new Date(this.props.event.startTime).toLocaleTimeString()}</h5>
                            </div>
                            <div className="col-xs-6">
                                <h5>End: {new Date(this.props.event.endTime).toLocaleTimeString()}</h5>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-10 col-xs-offset-1">
                                <h5>Facility Contact {this.props.facility.contactName}</h5>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-10 col-xs-offset-3">
                                <h5>Phone {this.props.facility.contactPhone}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

});

module.exports = EventCard;

