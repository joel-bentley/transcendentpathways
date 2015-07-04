var React = require('react');
var GetDistance = require('./GetDistance.jsx');
var GoogleMap = require('./GoogleMap.jsx');

var moment = require('moment');

var UpcomingEvents = React.createClass({
    eventChange: function(event){
        this.props.eventChange(event);
    },

    sortEvents: function(){
        var upcomingEvents = [];
        this.props.events.map(function (event) {
            var boundClick = this.eventChange.bind(this, event);
            if (new Date(event.start) > new Date()) {
                upcomingEvents.push(
                    <div className="panel panel-primary" onClick={boundClick} key={event._id}>
                        <div className="panel-heading">
                            {event.facilityName + "\n" + moment.utc(event.start).format('dddd MMMM D, YYYY')}
                        </div>
                        <div className="panel-body">
                            <div className="container-fluid">
                                <div className="row">
                                    <div >Start Date: {moment.utc(event.start).format('dddd MMMM D, YYYY')}</div>
                                    <div>Facility Name: {event.facilityName}</div>
                                    <div>Start Time: {moment.utc(event.start).format('h:mm a')}</div>
                                    <div>End Time: {moment.utc(event.end).format('h:mm a')}</div>
                                    {this.props.musician && this.props.facility ?
                                        <GetDistance
                                            musician={this.props.musician}
                                            facility={this.props.facility}
                                    /> : null }
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
        }.bind(this));
        return (upcomingEvents);
    },
    render: function(){

        return (
            <div className="panel panel-primary" key={"UPCOMING"}>
                <div className=" panel-heading">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-10">
                                Upcoming Events
                            </div>
                            <div className="col-sm-2">
                                <button className="btn-xs btn-info"
                                        id="upcomingButton"
                                        ref="upcomingToggle"
                                        type="button"
                                        data-toggle="collapse"
                                        data-target="#upcomingEvents"
                                        aria-expanded="false"
                                        aria-controls="upcomingEvents">
                                    <span className="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="panel-body collapse" id="upcomingEvents">
                    <div className="container-fluid">
                        {this.props.events ? this.sortEvents(): null}
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = UpcomingEvents;

