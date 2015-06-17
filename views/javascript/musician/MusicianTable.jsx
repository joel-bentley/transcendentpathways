var React = require('react');
var RequestedEvents = require('./RequestedEvents.jsx');
var ApprovedEvents = require('./ApprovedEvents.jsx');
var CompletedEvents = require('./CompletedEvents.jsx');
var SearchEvents = require('./SearchEvents.jsx');
var DetailEvents = require('./DetailEvents.jsx');
var async = require('async');

var styles = {
    left: {
        position: "fixed",
        float: "left"
    },
    right: {
        float: "right"
    }
};

var MusicianTable = React.createClass({
    getInitialState: function(){

        return({
            events: null,
            musician: null,
            facilities: null
        })
    },

    dataFetch() {
        async.parallel({
            events: function(callback) {
                $.get('/gigListing', function(events) {
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
                this.setState({
                    events: data.events.sort(function(a, b) {
                        return a.start > b.start;
                    }),
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


    componentDidMount: function(){
        this.dataFetch();
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

                    if(musician.musicianName === this.state.musician.performerName){
                        requestedEvents.push(<div key={event._id+musician._id}>{event.facilityName
                        + " " + new Date(event.start).toLocaleDateString()}</div>);
                    }
                }.bind(this));
            }.bind(this));

            this.state.events.map(function(event){
                if((event.approvedMusicianName === this.state.musician.performerName) && (event.status.completed === false)){
                    approvedEvents.push(<div key={event._id}>{event.facilityName
                    + " " + new Date(event.start).toLocaleDateString()}</div>);
                }
            }.bind(this));

            this.state.events.map(function(event){
                if((event.approvedMusicianName === this.state.musician.performerName) && (event.status.completed === true)){
                    completedEvents.push(<div key={event._id}>{event.facilityName
                    + " " + new Date(event.start).toLocaleDateString()}</div>);
                }
            }.bind(this));
        }

        return(
            <div className = "container-fluid">
                     <div className = "col-sm-5">
                        <SearchEvents />
                        <hr></hr>
                        <ApprovedEvents
                            approvedEvents={approvedEvents}
                        />
                        <hr></hr>
                        <RequestedEvents
                            requestedEvents={requestedEvents}
                        />
                        <hr></hr>
                        <CompletedEvents
                            completedEvents={completedEvents}
                        />
                        <hr></hr>
                     </div>
                    <div className="col-sm-7" style={styles.right}>
                        <DetailEvents
                            events={this.state.events}
                            facilities={this.state.facilities}
                            musician={this.state.musician}
                            updateEvent={this.updateEvent}
                        />
                    </div>

            </div>
        )
    }
});

React.render(<MusicianTable />, document.getElementById("gigListingApp"));