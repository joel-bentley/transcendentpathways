var React = require('react');
var Gig = require('./Gig.jsx');

var moment = require('moment');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            data: []
        };
    },

    componentDidMount: function() {
        $.get('/gigListing', function(result) {
            if (this.isMounted()) {
                this.setState({
                    data: result
                });
            }
        }.bind(this));
    },

    render: function(){

        return (
            <div className="list-group">
                {this.state.data.map(function(facility) {

                    return facility.gigs.map(function (gig) {

                        var startTime = new Date(gig.start);
                        var endTime = new Date(gig.end);

                        var dateString = moment(startTime).format('dddd MMMM Do YYYY');
                        var startTimeString = moment(startTime).format('h:mm a');
                        var endTimeString = moment(endTime).format('h:mm a');
                        var timeString = startTimeString + " - " + endTimeString;

                        return (
                            <Gig
                                facilityName={facility.facilityName}
                                dateString={dateString}
                                timeString={timeString}
                                details={gig.details}
                                />
                        )
                    })

                })}
            </div>
        )
    }
});
