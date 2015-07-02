var React = require('react');
var GetDistance = require('./GetDistance.jsx');
var GoogleMap = require('./GoogleMap.jsx');

var moment = require('moment');

var UpcomingEvents = React.createClass({

    sortEvents: function(){
        var upcomingEvents = [];
        if (this.props.events) {
            this.props.events.map(function (event) {
                if (new Date(event.start) > new Date()) {
                    upcomingEvents.push(
                        <div className="panel panel-primary " key={event._id}>
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

                                        <div>
                                            <GetDistance
                                                musician={this.props.musician}
                                                facility={event.facility}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }
            }.bind(this));
            return (upcomingEvents);
        } else { return null;}
    },
    render: function(){

        return (
            <div>
                <h4>Upcoming Events</h4>
                {this.sortEvents()}
            </div>
        );
    }
});

module.exports = UpcomingEvents;