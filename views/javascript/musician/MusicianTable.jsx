var React = require('react');
var RequestedEvents = require('./RequestedEvents.jsx');
var ApprovedEvents = require('./ApprovedEvents.jsx');
var CompletedEvents = require('./CompletedEvents.jsx');
var UpcomingEvents = require('./UpcomingEvents.jsx');
var SearchEvents = require('./SearchEvents.jsx');
var EventDetails = require('./EventDetails.jsx');

var async = require('async');

var moment = require('moment');

var MusicianTable = React.createClass({
    getInitialState: function(){

        return({
            event: null,
            events: null,
            musician: null,
            facilities: null
        })
    },

    dataFetch() {
        async.parallel({
            events: function(callback) {
                $.get('/gigListing', function(events) {
                    //console.log(events);
                    callback(null, events);
                });
            },
            musicianData: function(callback) {
                $.get('/getMusicianId', function(musician) {
                    callback(null, musician);
                });
            },
            facilityData: function(callback) {
                $.get('/homeAdminFacilityData', function(facilities) {
                    callback(null, facilities);
                });
            }
        }, function(err, data) {
                if (err) {
                    return console.error(err);
                }
                var sortedEvents = data.events.sort(function(a, b) {
                    return a.start > b.start;
                });

                this.setState({
                    events: sortedEvents,
                    musician: data.musicianData,
                    facilities: data.facilityData
                });
        }.bind(this));
    },

    gigList() {
        $.get('/gigListing', function(gigs) {
            this.setState({
                events: gigs
            });
        }.bind(this));
    },


    componentWillMount: function(){
        this.dataFetch();

    },

    eventFacility: function(facility){
        var myFacility = [];
        this.state.facilities.map(function(elem){
            if (elem.facilityName === facility){
                myFacility= elem;
            }
        });
        return myFacility;
    },

    facilitizeEvents: function(events){
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

    eventChange: function(event){
        this.state.events && this.state.facilities ? this.facilitizeEvents(this.state.events) : null;
        this.setState({
            event: event
        });
    },

    updateEvent: function(newEvent){
        var saveEvent = newEvent;
        this.state.events.map(function(event){
            if(event._id === newEvent._id) {
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
      });
        $.ajaxSetup({
            headers: {
                'X-CSRF-Token': this.getCSRFTokenValue()
            }
        });
        $.post('/postUpdateEventDetails',saveEvent, function(result){
            this.gigList();
        }.bind(this));
    },

    getCSRFTokenValue: function() {
        var metas = document.getElementsByTagName('meta');

        for (var i=0; i<metas.length; i++) {
            if (metas[i].getAttribute("name") == 'csrf-token') {
                return metas[i].getAttribute('content');
            }
        }
        return '';
    },

    render: function(){
        var requestedEvents = [];
        var approvedEvents = [];
        var completedEvents = [];

        if (this.state.events && this.state.musician){
            this.state.events.map(function(event){
                event.requestedBy.map(function(musician){
                    if (musician) {
                        if (musician.musicianName === this.state.musician.performerName) {
                            requestedEvents.push(<div
                                key={event._id+musician._id}>{event.facilityName + "\n" + moment.utc(event.start).format('dddd MMMM D, YYYY')}</div>);
                        }
                    }
                }.bind(this));
            }.bind(this));

            this.state.events.map(function(event){
                if((event.approvedMusicianName === this.state.musician.performerName) && (event.status.completed === false)){
                    approvedEvents.push(<div key={event._id} type="button" onClick={this.eventChange.bind(this, event)}>
                        {event.facilityName + "\n" + moment.utc(event.start).format('dddd MMMM D, YYYY')}</div>);
                }
            }.bind(this));

            this.state.events.map(function(event){
                if((event.approvedMusicianName === this.state.musician.performerName) && (event.status.completed === true)){
                    completedEvents.push(<div key={event._id}>{event.facilityName + "\n" + moment.utc(event.start).format('dddd MMMM D, YYYY')}</div>);
                }
            }.bind(this));


        }
        return(
            <div className = "container-fluid">
                <div className = "col-sm-4">
                <UpcomingEvents
                    events={this.state.events}
                    musician={this.state.musician}
                    eventChange={this.eventChange}
                />
                <ApprovedEvents
                    events={this.state.events}
                    musician={this.state.musician}
                />
                <RequestedEvents
                    events={this.state.events}
                    musician={this.state.musician}
                />
                <CompletedEvents
                    events={this.state.events}
                    musician={this.state.musician}
                />

                </div>
                <div className="col-sm-8">
                {this.state.event ? <EventDetails
                    event={this.state.event}
                    events={this.state.events}
                    facility={this.state.event.facility}
                    musician={this.state.musician}
                    updateEvent={this.updateEvent}
                />: null }
                </div>

            </div>
        )
    }
});

React.render(<MusicianTable />, document.getElementById("gigListingApp"));