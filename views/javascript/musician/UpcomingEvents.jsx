var React = require('react');
var GetDistance = require('./GetDistance.jsx');
var GoogleMap = require('./GoogleMap.jsx');
var EventsPanel = require('./EventsPanel.jsx');
var moment = require('moment');

var UpcomingEvents = React.createClass({

    getDefaultProps: function(){
        return({
            events: 0
        })
    },
    eventChange: function(event){
        var bodyRect = document.body.getBoundingClientRect(),
            elemRect = document.getElementById('upcomingEvent'+event._id).getBoundingClientRect(),
            offset   = elemRect.top - bodyRect.top;

        this.props.eventChange(event);
        this.props.renderOffset(offset);

    },
    sortEvents: function(){
        var upcomingEvents = [];
        this.props.events.map(function (event) {
            var boundClick = this.eventChange.bind(null, event);
            if (new Date(event.start) > new Date() && this.props.musician.approved) {
                upcomingEvents.push(
                    <div className="panel panel-primary " key={event._id}>
                        <div className="panel-heading">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-sm-9">
                                        {event.facilityName}
                                    </div>
                                    <div className="col-sm-3">
                                        <button
                                            id = {"upcomingEvent" + event._id}
                                            className="btn-xs btn-default"
                                            type="button"
                                            onClick={boundClick}>
                                            <span className="glyphicon glyphicon-triangle-right" aria-hidden="true"></span>
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="panel-body">
                            <div>Date: {moment.utc(event.start).format('dddd MMMM D, YYYY')}</div>
                            <div>Facility Name: {event.facilityName}</div>
                            <div>Start Time: {moment.utc(event.start).format('h:mm a')}</div>
                            <div>End Time: {moment.utc(event.end).format('h:mm a')}</div>
                        </div>
                    </div>
                );
            }
        }.bind(this));

        return upcomingEvents;
    },
    render: function(){
        return (
            <div>
                <EventsPanel
                    events={this.props.events}
                    sortEvents={this.sortEvents}
                    eventType={'upcomingEvents'}
                    eventName={'Upcoming Events'}
                    panelClass={'panel-default'}
                    />
            </div>
        );
    }
});

module.exports = UpcomingEvents;

