var React = require('react');

var EventCard = require('./EventCard.jsx');
var StatusCard = require('./StatusCard.jsx');


var EventContainer = React.createClass({

    enableSave: function(state){
        this.setState({
            enableSave: state
        })
    },
    renderOffset: function(offset){
        this.setState({
            offset: offset
        })
    },
    getDefaultProps: function() {
        return {
            source: '/homeAdminEventData',
            postRoute: '/admin/updateEventDetails',
            facilitySource: '/getFacilityInfo'
        }
    },
    getInitialState: function(){
        return {
            events: [],
            event: [],
            showResults: false,
            enableSave: false,
            offset: 0
        }
    },
    updateEvent: function(event){
        if (event) {
            this.setState({
                event: event
            });
        }
    },
    componentDidMount: function() {                                 //csh loading the events into this.state.events
        $.get(this.props.source, function(result) {
            this.setState({
                events: result
            });
        }.bind(this));

    },

    showDetails: function(eventNew){
        this.setState({
            showResults: true,
            event: eventNew
        });
        //document.body.scrollTop = document.documentElement.scrollTop = 0;
    },


    render: function(){
        var completeEvents = [];
        var upcomingEvents = [];
        this.state.events.forEach(function(event) {
            if (!event.status.completed && !event.status.canceled){
                upcomingEvents.push(
                    <EventCard
                        event = {event}
                        key = {event._id}
                        showDetails = {this.showDetails}
                        enableSave = {this.enableSave}
                        allowSave = {this.state.enableSave}
                        renderOffset = {this.renderOffset}
                        />
                );
            } else {
                completeEvents.push(
                    <EventCard
                        event = {event}
                        key = {event._id}
                        showDetails = {this.showDetails}
                        enableSave = {this.enableSave}
                        allowSave = {this.state.enableSave}
                        renderOffset = {this.renderOffset}
                        />
                );
            }
        }.bind(this));
        return (
            <div>
                <div className="container-fluid">
                    <h4>Upcoming Events</h4>
                    <div className="row">
                        <div className="col-sm-4 ">
                            {upcomingEvents}
                            <hr></hr>
                            <h4>Completed Events</h4>
                            {completeEvents}
                        </div>
                        <div className="col-sm-8 ">
                            {this.state.showResults ?
                                    <StatusCard
                                        offset = {this.state.offset}
                                        ref = "status"
                                        event={this.state.event}
                                        updateEvent={this.updateEvent}
                                        allowSave = {this.state.enableSave}
                                        enableSave = {this.enableSave}
                                    />
                                :  null}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

React.render(<EventContainer />, document.getElementById("eventAdmin"));