var React = require('react');
var Alert = require('react-bootstrap').Alert;
var RequestedEvents = require('./RequestedEvents.jsx');
var ApprovedEvents = require('./ApprovedEvents.jsx');
var CompletedEvents = require('./CompletedEvents.jsx');
var UpcomingEvents = require('./UpcomingEvents.jsx');
var SearchEvents = require('./SearchEvents.jsx');
var EventDetails = require('./EventDetails.jsx');

var async = require('async');

var moment = require('moment');

var MusicianTable = React.createClass({
    getInitialState: function () {

        return ({
            event: null,
            events: null,
            musician: null,
            facilities: null,
            showMap: false,
            eventID: null,
            offset: 0
        })
    },

    dataFetch() {
        async.parallel({
            musicianData: function (callback) {
                $.get('/getMusicianId', function (musician) {
                    callback(null, musician);
                });
            },
            events: function (callback) {
                $.get('/gigListing', function (events) {
                    callback(null, events);
                });
            },
            facilityData: function (callback) {
                $.get('/homeAdminFacilityData', function (facilities) {
                    callback(null, facilities);
                });
            }
        }, function (err, data) {
            if (err) {
                return console.error(err);
            }
            var sortedEvents = data.events.sort(function (a, b) {
                return new Date(a.start) - new Date(b.start);
            });

            this.setState({
                events: sortedEvents,
                musician: data.musicianData,
                facilities: data.facilityData
            });
        }.bind(this));
    },
    componentDidMount: function () {
        this.dataFetch();

    },
    eventFacility: function (facility) {
        var myFacility = [];
        this.state.facilities.map(function (elem) {
            if (elem.facilityName === facility) {
                myFacility = elem;
            }
        });
        return myFacility;
    },

    facilitizeEvents: function (events) {
        var modifiedEvent = null;
        var facilitized = [];
        events.map(function (event) {
            modifiedEvent = event;
            modifiedEvent.facility = this.eventFacility(event.facilityName);
            facilitized.push(modifiedEvent);
        }.bind(this));
        this.setState({
            events: facilitized,
            facilitized: true
        });
    },
    renderOffset: function(offset){
        this.setState({
            offset: offset
        })
    },
    eventChange: function (event) {
        this.state.events && this.state.facilities ? this.facilitizeEvents(this.state.events) : null;
            this.setState({
                eventID: event._id,
                event: event
            });
    },

    updateEvent: function (newEvent) {
        var saveEvent = newEvent;
        this.state.events.map(function (event) {
            if (event._id === newEvent._id) {
                saveEvent.requestedBy = newEvent.requestedBy;
                saveEvent.status = newEvent.status;
                saveEvent.facilityName = newEvent.facilityName;
                saveEvent.facilityId = newEvent.facilityId;
                saveEvent.title = newEvent.title;
                saveEvent.start = newEvent.start;
                saveEvent.end = newEvent.end;
                saveEvent.description = newEvent.description;
                saveEvent.approvedMusicianName = newEvent.approvedMusicianName;
                saveEvent.approvedMusicianId = newEvent.approvedMusicianId;
                saveEvent.payment = newEvent.payment;
                saveEvent.performance = newEvent.performance;
            }
        }.bind(this));
        //console.log(this.state.musician);
        $.ajaxSetup({
            headers: {
                'X-CSRF-Token': this.getCSRFTokenValue()
            }
        });
        $.post('/postUpdateEventDetails', saveEvent, function (result) {
            this.dataFetch();
        }.bind(this));
    },

    getCSRFTokenValue: function () {
        var metas = document.getElementsByTagName('meta');

        for (var i = 0; i < metas.length; i++) {
            if (metas[i].getAttribute("name") == 'csrf-token') {
                return metas[i].getAttribute('content');
            }
        }
        return '';
    },

    render: function () {
        if (this.state.musician === null){
            return (
                <div className="row">
                    <div className="col-sm-8 col-sm-offset-2">
                        <Alert bsStyle='info'
                               bSize='small'
                            >
                            <h4>Loading Events</h4>
                            <p>Retrieving event records.</p>
                        </Alert>
                    </div>
                </div>
            )
        } else if (!this.state.musician.approved){
            return (
                <div className="row">
                    <div className="col-sm-8 col-sm-offset-2">
                        <Alert bsStyle='info'
                               bSize='small'
                               >
                            <h4>Account Awaiting Admin Approval</h4>
                            <p>A request has been submitted to the site administrator for approval. Once your account
                            is approved, you will receive confirmation via email.</p>
                        </Alert>
                    </div>
                </div>
            )
        } else {
        return (
            <div className="container-fluid">
                <div className="col-sm-4">
                    <UpcomingEvents
                        events={this.state.events}
                        musician={this.state.musician}
                        eventChange={this.eventChange}
                        renderOffset={this.renderOffset}
                        />
                    <ApprovedEvents
                        events={this.state.events}
                        musician={this.state.musician}
                        eventChange={this.eventChange}
                        renderOffset={this.renderOffset}
                        />
                    <RequestedEvents
                        events={this.state.events}
                        musician={this.state.musician}
                        eventChange={this.eventChange}
                        renderOffset={this.renderOffset}
                        />
                    <CompletedEvents
                        events={this.state.events}
                        musician={this.state.musician}
                        eventChange={this.eventChange}
                        renderOffset={this.renderOffset}
                        />
                </div>
                <div className="col-sm-8">
                    {this.state.event ? <EventDetails
                        event={this.state.event}
                        events={this.state.events}
                        facility={this.state.event.facility}
                        musician={this.state.musician}
                        updateEvent={this.updateEvent}
                        offset={this.state.offset}
                        gigList={this.gigList}


                        /> : null }
                </div>
            </div>
        )}
    }
});

React.render(<MusicianTable />, document.getElementById("gigListingApp"));