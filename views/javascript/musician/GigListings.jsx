var React = require('react');
var Gig = require('./Gig.jsx');

var moment = require('moment');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            data: [],
            requested: []
        };
    },

    componentDidMount: function() {
        $.get('/gigListing', function(gigs) {

            var newRequested = this.state.requested;

            $.get('/getMusicianId', function(musician) {
                //console.dir(musician);

                for (var i=0; i<gigs.length; i++) {
                    for (var j=0; j<gigs[i].requestedBy.length; j++) {

                        //console.dir(gigs[i].requestedBy[j].musicianId);
                        //console.dir(musician._id);
                        //console.dir('next');

                        if (gigs[i].requestedBy[j].musicianId === musician._id) {
                            if (newRequested.indexOf(gigs[i]._id) === -1) {
                                newRequested.push(gigs[i]._id);
                            }
                        }

                    }
                }
                //console.dir(newRequested);
            });


            if (this.isMounted()) {
                this.setState({
                    data: gigs,
                    requested: newRequested
                });
            }
        }.bind(this));
    },

    getCSRFTokenValue: function() {
        var metas = document.getElementsByTagName('meta');

        for (var i=0; i<metas.length; i++) {
            if (metas[i].getAttribute("name") === 'csrf-token') {
                return metas[i].getAttribute('content');
            }
        }
        return '';
    },

    requestGig: function(gigId) {


        //console.dir(gigId);

        if (this.state.requested.indexOf(gigId) === -1) {

            $.ajaxSetup({
                headers: {
                    'X-CSRF-Token': this.getCSRFTokenValue()
                }
            });
            $.post('/postRequestGig', {gigId: gigId}, function(result){
                console.dir(result);
            });

            var newRequestedArray = this.state.requested;
            newRequestedArray.push(gigId);

            //console.dir(newRequestedArray);

            if (this.isMounted()) {
                this.setState({
                    requested: newRequestedArray
                });
            }
        }

    },

    render: function(){

        return (
            <div className="list-group">
                {this.state.data.map(function(gig) {

                    var startTime = new Date(gig.startTime);
                    var endTime = new Date(gig.endTime);

                    var dateString = moment(startTime).format('dddd MMMM D[,] YYYY');
                    var startTimeString = moment(startTime).format('h:mm a');
                    var endTimeString = moment(endTime).format('h:mm a');
                    var timeString = startTimeString + " - " + endTimeString;


                    //console.dir(this.state.requested);
                    //console.dir(gig._id);
                    //console.dir('next');

                    return (
                        <Gig
                            facilityName={gig.facilityName}
                            dateString={dateString}
                            timeString={timeString}
                            details={gig.description}
                            key={gig._id}
                            handleClick={this.requestGig.bind(this, gig._id)}
                            requested={ this.state.requested.indexOf(gig._id) === -1 ? false : true }
                            />
                    )

                }.bind(this))}
            </div>
        )
    }
});
