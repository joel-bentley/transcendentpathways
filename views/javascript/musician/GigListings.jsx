var React = require('react');
var Gig = require('./Gig.jsx');

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

                        return (
                            <Gig
                                facilityName={facility.facilityName}
                                date={startTime.toDateString()}
                                startTime={startTime.toLocaleTimeString()}
                                endTime={endTime.toLocaleTimeString()}
                                details={gig.details}
                                />
                        )
                    })

                })}
            </div>
        )
    }
});
