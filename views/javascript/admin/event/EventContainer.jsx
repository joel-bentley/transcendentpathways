var React = require('react');
var EventCard = require('./EventCard.jsx');
var StatusCard = require('./StatusCard.jsx');


var EventContainer = React.createClass({
    enableSave: function(state){
        this.setState({
            enableSave: state
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
            facility: [],
            enableSave: false
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
            var eventData = result;
            this.setState({
                events: eventData
            });
        }.bind(this));

    },

    showDetails: function(eventNew){
        this.setState({
            showResults: true,
            event: eventNew
        });
        document.body.scrollTop = document.documentElement.scrollTop = 0;
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
    getFacilityInfo: function(facilityName){
        var facility={};
        $.ajaxSetup({
            headers: {
                'X-CSRF-Token': this.getCSRFTokenValue()
            }
        });
        $.post(this.props.facilitySource, {name: facilityName}, function(result){
            facility = result;
            this.setState({
                facility: facility
            });
        }.bind(this));
    },

    render: function(){
        var completeEvents = [];
        var upcomingEvents = [];
        this.state.events.forEach(function(event) {
            if (new Date(event.startTime) >= new Date()){
                upcomingEvents.push(
                    <EventCard
                        event = {event}
                        key = {event._id}
                        getFacilityInfo = {this.getFacilityInfo}
                        facility = {this.state.facility}
                        showDetails = {this.showDetails}
                        enableSave = {this.enableSave}
                        allowSave = {this.state.enableSave}
                        />
                );
            } else {
                completeEvents.push(
                    <EventCard
                        event = {event}
                        key = {event._id}
                        getFacilityInfo = {this.getFacilityInfo}
                        facility = {this.state.facility}
                        showDetails = {this.showDetails}
                        enableSave = {this.enableSave}
                        allowSave = {this.state.enableSave}
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
                                    ref = "status"
                                    event={this.state.event}
                                    updateEvent={this.updateEvent}
                                    allowSave = {this.state.enableSave}
                                    enableSave = {this.enableSave}
                                /> :  null}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

React.render(<EventContainer />, document.getElementById("eventAdmin"));