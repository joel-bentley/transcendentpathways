var React = require('react');
var DayColumn = require('./DayColumn.jsx');

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

                        var start = new Date(gig.start);
                        var end = new Date(gig.end);

                        return (
                            <Gig
                                facilityName={facility.facilityName}
                                date={start.toDateString()}
                                start={start.toLocaleTimeString()}
                                end={end.toLocaleTimeString()}
                                details={gig.details}
                                />
                        )
                    })

                })}
            </div>
        )
    }
});
