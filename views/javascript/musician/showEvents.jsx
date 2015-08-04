var React = require ('react');
var moment = require('moment');
var Alert = require('react-bootstrap').Alert;

var EventsPanel = require('./EventsPanel.jsx');
var EventDetails = require('./EventDetails.jsx');

var ShowEvents = React.createClass({
    eventPrep: function() {
        var upcoming = [],
            approved = [],
            requested = [],
            complete = [];
        var myMusician = this.props.musician;
        var myRequest = this.props.request;
        var request = false;

        this.props.events.map(function (event) {
            request=false;
            // prepare for requested sorting
            event.requestedBy.map(function (musician) {
                if (musician.musicianName === myMusician.performerName) {
                    request=true;
                }
            })
            // sort--completed / cancelled events first
            // event.approvedMusicianName === this.props.musician.performerName) &&
            // (event.status.completed === true) &&
            // this.props.musician.approved ... to perform
            if (event.approvedMusicianName === myMusician.performerName
                && event.status.completed && myMusician.approved ) {
                complete.push(event);
            }
            // sort--approved
            // event.approvedMusicianName === this.props.musician.performerName &&
            // event.status.completed === false &&
            // this.props.musician.approved ... to perform
            else if (event.approvedMusicianName === myMusician.performerName &&
                !event.status.completed && myMusician.approved && new Date(event.start) >= new Date()) {
                approved.push(event);
            }
            // sort--requested
            // musician.musicianName === this.props.musician.performerName &&
            // this.props.musician.approved
            // event.requestedBy.map(function (musician) {
            //    if (musician) {
            //        if (musician.musicianName === musicianName && approved) {
            //            requestedEvents.push(
            else if (request && myMusician.approved && new Date(event.start) > new Date()) {
                requested.push(event);

            }
            // sort--upcoming
            // new Date(event.start) > new Date() &&
            // this.props.musician.approved &&
            else if (new Date(event.start) > new Date() && myMusician.approved) {
                upcoming.push(event);
            }

        });
        this.setState({
            complete: complete,
            approved: approved,
            requested: requested,
            upcoming: upcoming,
            request: request
        })
    },
    eventChange: function (event,type) {
        this.setState({
            eventID: event._id,
            event: event,
            type: type
        });
        //console.log(event);
        this.facilitizeEvents(this.props.events);
    },
    facilitizeEvents: function (events) {
        var modifiedEvent = null;
        var facilitized = [];
        events.map(function (event) {
            modifiedEvent = event;
            modifiedEvent.facility = this.eventFacility(event.facilityName);
            facilitized.push(modifiedEvent);
        }.bind(this));
        //console.log(facilitized);
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

    componentWillMount(){
        this.eventPrep();
    },
    eventFacility: function (facility) {
        var myFacility = [];
        this.props.facilities.map(function (elem) {
            if (elem.facilityName === facility) {
                myFacility = elem;
            }
        });
        return myFacility;
    },

    render: function(){
        return(
            <div className="container-fluid">
                <div className="col-sm-4">
                    <EventsPanel
                        key={'upcoming'}
                        event={this.state.event}
                        events={this.state.upcoming}
                        count={this.state.upcoming.length}
                        eventType={'upcomingEvents'}
                        eventName={'Upcoming Events'}
                        panelClass={'panel-primary'}
                        eventChange={this.eventChange}
                        renderOffset={this.renderOffset}
                        />
                    <EventsPanel
                        key={'approved'}
                        event={this.state.event}
                        events={this.state.approved}
                        count={this.state.approved.length}
                        eventType={'approvedEvents'}
                        eventName={'Approved Events'}
                        panelClass={'panel-success'}
                        eventChange={this.eventChange}
                        renderOffset={this.renderOffset}
                        />
                    <EventsPanel
                        key={'requested'}
                        event={this.state.event}
                        events={this.state.requested}
                        count={this.state.requested.length}
                        eventType={'requestedEvents'}
                        eventName={'Requested Events'}
                        panelClass={'panel-default'}
                        eventChange={this.eventChange}
                        renderOffset={this.renderOffset}
                        />
                    <EventsPanel
                        key={'complete'}
                        event={this.state.event}
                        events={this.state.complete}
                        count={this.state.complete.length}
                        eventType={'completeEvents'}
                        eventName={'Completed Events'}
                        panelClass={'panel-default'}
                        eventChange={this.eventChange}
                        renderOffset={this.renderOffset}
                        />
                </div>
                <div className="col-sm-8">
                    {this.state.event ? <EventDetails
                        event={this.state.event}
                        events={this.state.events}
                        facilties = {this.props.facilities}
                        facility={this.state.event.facility}
                        musician={this.props.musician}
                        updateEvent={this.props.updateEvent}
                        offset={this.state.offset}
                        eventPrep={this.eventPrep}
                        type={this.state.type}

                        /> : null }
                </div>
            </div>
        );
    }
});
module.exports=ShowEvents;