var React = require('react');
var EventRow = require('./EventRow.jsx');

var DetailEvents = React.createClass({
    getInitialState: function(){
        return ({
            showDetails: false
        })
    },
    showDetails: function(){
        this.setState({
            showDetails: !this.state.showDetails
        })
    },
    render: function() {
        var eventRows = [];
        var facility = null;
        if (this.props.events && this.props.facilities) {
            this.props.events.map(function (event) {
                this.props.facilities.map(function(facilityMap){
                    if(event.facilityId === facilityMap._id){
                        facility = facilityMap;
                    }
                }.bind(this));
                if(new Date(event.startTime) > new Date() ){
                    eventRows.push(
                        <EventRow key={event._id} event={event} facility={facility} musician={this.props.musician}/>
                    )
                }
            }.bind(this));
        }
        return(
            <div>
                <h4>Upcoming Events</h4>
                    {eventRows}
            </div>
        )
    }
});

module.exports = DetailEvents;