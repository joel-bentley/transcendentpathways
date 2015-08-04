var React = require('react');
var Alert = require('react-bootstrap').Alert;
var ShowEvents = require('./ShowEvents.jsx');

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
            offset: 0,
            upcoming: [],
            approved: [],
            requested: [],
            complete: [],
            request: false
        })
    },

    dataFetch: function() {
        var sortedEvents = [];
        async.series({
            musicianData: function (callback) {
                $.get('/getMusicianId', function (musician) {
                    //console.log( musician);
                    callback(null, musician);
                });
            },  
            events: function (callback) {
                $.get('/gigListing', function (events) {
                    //console.log('got events %s', events);
                    callback(null, events);
                });
            },
            facilityData: function (callback) {
                $.get('/homeAdminFacilityData', function (facilities) {
                    //console.log('got facilities %s', facilities);
                    callback(null, facilities);
                });
            }
        }, function (err, data) {
            if (err) {
                return console.error(err);
            }
            sortedEvents = data.events.sort(function (a, b) {
                return new Date(a.start) - new Date(b.start);
            });
            //console.log( data.musicianData);
            //console.log('got events %s', sortedEvents);
            //console.log(data.facilityData);

            this.setState({
                events: sortedEvents,
                musician: data.musicianData,
                facilities: data.facilityData
            });

        }.bind(this));

    },
    
    componentWillMount: function () {
        this.dataFetch();
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
        } else if (this.state.musician.approved===false){
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
        } else return (
            <div>
                <ShowEvents
                    events={this.state.events}
                    musician={this.state.musician}
                    facilities={this.state.facilities}
                    eventChange={this.eventChange}
                    updateEvent={this.updateEvent}
                />
            </div>
        )
    }
});

React.render(<MusicianTable />, document.getElementById("gigListingApp"));