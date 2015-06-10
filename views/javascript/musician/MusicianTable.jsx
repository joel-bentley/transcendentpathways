var React = require('react');
var RequestedEvents = require('./RequestedEvents.jsx');
var ApprovedEvents = require('./ApprovedEvents.jsx');
var CompletedEvents = require('./CompletedEvents.jsx');
var SearchEvents = require('./SearchEvents.jsx');
var DetailEvents = require('./DetailEvents.jsx');

var MusicianTable = React.createClass({
    getInitialState: function(){

        return({
            events: null,
            sortedEvents: null,
            musician: null
        })
    },

    componentWillMount: function(){
        $.get('/gigListing', function(gigs) {
                this.setState({
                    events: gigs
                });
        }.bind(this));
        $.get('/getMusicianId', function(musician) {
                this.setState({
                    musician: musician
                });
        }.bind(this));

        $.get('/homeAdminFacilityData', function(facilities) {
            this.setState({
                facilities: facilities
            });
        }.bind(this));
    },

    render: function(){
        var requestedEvents = [];
        var approvedEvents = [];
        var completedEvents = [];
        if (this.state.events && this.state.musician){
            this.state.events.sort(function(a,b){
               return a.start > b.start;
            });
            this.state.events.map(function(event){
                event.requestedBy.map(function(musician){
                    if(musician.musicianName === this.state.musician.performerName){
                        requestedEvents.push(<div key={event._id+musician._id}>{event.facilityName
                        + " " + new Date(event.start).toLocaleDateString()}</div>);
                    }
                }.bind(this));
            }.bind(this));
        }
        if (this.state.events && this.state.musician){
            this.state.events.map(function(event){
                if((event.approvedMusician === this.state.musician.performerName) && (event.status.completed === false)){
                    approvedEvents.push(<div key={event._id}>{event.facilityName
                    + " " + new Date(event.start).toLocaleDateString()}</div>);
                }
            }.bind(this));
        }
        if (this.state.events && this.state.musician){
            this.state.events.map(function(event){
                if((event.approvedMusician === this.state.musician.performerName) && (event.status.completed === true)){
                    completedEvents.push(<div key={event._id}>{event.facilityName
                    + " " + new Date(event.start).toLocaleDateString()}</div>);
                }
            }.bind(this));
        }


        return(
            <div>
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

                <DetailEvents
                    events={this.state.events}
                    facilities={this.state.facilities}
                    musician={this.state.musician}
                />

            </div>
        )
    }
});

React.render(<MusicianTable />, document.getElementById("gigListingApp"));