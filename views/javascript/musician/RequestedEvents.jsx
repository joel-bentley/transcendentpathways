var React = require('react');
var GetDistance = require('./GetDistance.jsx');
var GoogleMap = require('./GoogleMap.jsx');
var EventsPanel = require('./EventsPanel.jsx');
var moment = require('moment');

var RequestedEvents = React.createClass({

    getDefaultProps: function(){
        return({
            events: 0
        })
    },
    eventChange: function(event){
        var bodyRect = document.body.getBoundingClientRect(),
            elemRect = document.getElementById('requestedEvent'+event._id).getBoundingClientRect(),
            offset   = elemRect.top - bodyRect.top;

        this.props.eventChange(event);
        this.props.renderOffset(offset);

    },
    sortEvents: function(){
        var requestedEvents = [];
        this.props.events.map(function(event) {
            var boundClick = this.eventChange.bind(this, event);
            var musicianName = this.props.musician.performerName;

            event.requestedBy.map(function (musician) {
                if (musician) {
                    if (musician.musicianName === musicianName) {
                        requestedEvents.push(
                            <div className="panel panel-default " key={event._id}>
                                <div className="panel-heading">
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col-sm-9">
                                                {event.facilityName}
                                            </div>
                                            <div className="col-sm-3">
                                                <button
                                                    id = {"requestedEvent" + event._id}
                                                    className="btn-xs btn-default"
                                                    type="button"
                                                    onClick={boundClick}>
                                                    <span className="glyphicon glyphicon-triangle-right"
                                                          aria-hidden="true"></span>
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
                        )
                    }
                }
            })
        }.bind(this));
        return requestedEvents;
    },
    render: function(){
        return (
            <div>
                <EventsPanel
                    events={this.props.events}
                    sortEvents={this.sortEvents}
                    eventType={'requestedEvents'}
                    eventName={'Requested Events'}
                    panelClass={'panel-primary'}
                    />
            </div>
        );
    }
});

module.exports = RequestedEvents;

