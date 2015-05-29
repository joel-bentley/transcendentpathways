var React = require('react');
var RequestedEvents = require('./RequestedEvents.jsx');

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
        debugger;
        var requestedEvents = [];
        if (this.state.events && this.state.musician){
            this.state.events.map(function(event){
                event.requestedBy.map(function(musician){
                    if(musician.musicianName === this.state.musician.performerName){
                        requestedEvents.push(<li key={event._id}>{event.facilityName + " " + new Date(event.startTime).toLocaleDateString()}</li>);
                    }
                }.bind(this));
            }.bind(this));
        }

        return(
            <div>
                {requestedEvents ?
                    <RequestedEvents
                        requestedEvents={requestedEvents}
                        /> :
                    <p>Loading...</p>
                }
            </div>
        )
    }
});

React.render(<MusicianTable />, document.getElementById("gigListingApp"));