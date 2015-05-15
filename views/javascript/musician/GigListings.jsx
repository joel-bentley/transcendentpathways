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
                {this.state.data.map(function(gig, index) {

                    var startTime = new Date(gig.startTime);
                    var endTime = new Date(gig.endTime);

                    var dateString = moment(startTime).format('dddd MMMM D[,] YYYY');
                    var startTimeString = moment(startTime).format('h:mm a');
                    var endTimeString = moment(endTime).format('h:mm a');
                    var timeString = startTimeString + " - " + endTimeString;

                    return (
                        <Gig
                            facilityName={gig.facilityName}
                            dateString={dateString}
                            timeString={timeString}
                            details={gig.description}
                            key={index}
                            />
                    )

                })}
            </div>
        )
    }
});
