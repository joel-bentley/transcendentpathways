var React = require('react');
var RequestedEvents = require('./RequestedEvents.jsx');
var ApprovedEvents = require('./ApprovedEvents.jsx');

var MusicianTable = React.createClass({
    getInitialState: function(){

        return({
            events: null,
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

    },

    render: function(){
        var requestedEvents = [];
        var approvedEvents = [];
        if (this.state.events && this.state.musician){
            this.state.events.map(function(event){
                event.requestedBy.map(function(musician){
                    if(musician.musicianName === this.state.musician.performerName){
                        requestedEvents.push(<div key={event._id+musician._id}>{event.facilityName
                        + " " + new Date(event.startTime).toLocaleDateString()}</div>);
                    }
                }.bind(this));
            }.bind(this));
        }
        if (this.state.events && this.state.musician){
            this.state.events.map(function(event){
                if(event.approvedMusician === this.state.musician.performerName){
                    approvedEvents.push(<div key={event._id}>{event.facilityName
                    + " " + new Date(event.startTime).toLocaleDateString()}</div>);
                }
            }.bind(this));
        }


        return(
            <div>
                <ApprovedEvents
                    approvedEvents={approvedEvents}
                />
                <hr></hr>
                <RequestedEvents
                    requestedEvents={requestedEvents}
                />
                <hr></hr>

            </div>
        )
    }
});

React.render(<MusicianTable />, document.getElementById("gigListingApp"));