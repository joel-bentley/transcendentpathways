var React = require('react');
var Alert = require('react-bootstrap').Alert;
var GetDistance = require('./GetDistance.jsx');
var GoogleMap = require('./GoogleMap.jsx');


var moment = require('moment');

var EventDetails = React.createClass({
    getInitialState: function(){
        return({
            requestEvent: false,
            requested: false
        })
    },
    componentDidMount: function(){
        this.placeDiv(0,this.props.offset);
    },
    componentDidUpdate: function(){
        this.placeDiv(0,this.props.offset);
    },
    componentWillReceiveProps: function(){
        this.setState({
            requestEvent: false
        })
    },
    dismissAlert: function(){
        this.setState({
            requested: false
        })
    },
    placeDiv: function(x_pos, y_pos) {
        var d = this.getDOMNode();
        d.style.position = "absolute";
        d.style.left = x_pos+'px';
        d.style.top = y_pos-72+'px';
    },
    handleClick: function() {
        var thisEvent = this.props.event;
        var alreadyRegistered = false;
        thisEvent.requestedBy.map(function (elem) {
            if (elem.musicianName === this.props.musician.performerName) {
                alreadyRegistered = true;
            }
        }.bind(this));
        if (alreadyRegistered === false) {
            this.props.event.requestedBy.push({
                "musicianName": this.props.musician.performerName,
                "musicianId": this.props.musician._id
            });
        }
        this.props.updateEvent(this.props.event);
        this.props.gigList();
        this.setState({
            requested: true
        })
    },
    handleAlertDismiss: function(){
        this.setState({
            requested: false
        })
        console.log('handleAlertDismiss called');
    },

    render: function(){

        return(
            <div className="col-sm-12 slideTransition" >
                <div className="panel panel-default">
                    <div className="panel-heading">
                        {this.props.event.facilityName + ' on ' + moment.utc(this.props.event.start).format('dddd MMMM D, YYYY')}
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            <div className="col-sm-12">
                                <div><h4>Itinerary</h4></div>
                                <div >Event Date: {moment.utc(this.props.event.start).format('dddd MMMM D, YYYY')}</div>
                                <div>Facility Name: {this.props.event.facilityName}</div>
                                <div>Start Time: {moment.utc(this.props.event.start).format('h:mm a')}</div>
                                <div>End Time: {moment.utc(this.props.event.end).format('h:mm a')}</div>
                                <div>{this.props.musician && this.props.event.facility ?
                                    <GetDistance
                                        musician={this.props.musician}
                                        facility={this.props.event.facility}
                                    /> : null }
                                </div>
                                <hr></hr>
                                <div><h4>Address</h4></div>
                                <div>{this.props.event.facility.address1}</div>
                                <div>{this.props.event.facility.address2}</div>
                                <div>{this.props.event.facility.city+ ", " +
                                    this.props.event.facility.state + " " +
                                    this.props.event.facility.zipcode}
                                </div>
                                <div>Building: {this.props.event.facility.buildingName}</div>
                                <div>Location: {this.props.event.facility.locationName}</div>
                                <div>Room Size: {this.props.event.facility.roomSize}</div>
                                <div>Waiver Required: {this.props.event.facility.waiverNeeded ? 'Yes' : 'No'}</div>
                                <div>Security Provided: {this.props.event.facility.securityNeeded ? 'Yes' : 'No'}</div>
                                <div>Expected Attendees: {this.props.event.facility.patientNumber}</div>
                                <hr></hr>
                                <div><h4>Event Contact</h4></div>
                                <div>{this.props.event.facility.contactName}</div>
                                <div>{this.props.event.facility.contactPhone}</div>
                                <div>{this.props.event.facility.contactEmail}</div>
                                <hr></hr>
                                <div>
                                    <h4>Event Details</h4>
                                </div>
                                <div>
                                    {this.props.event.description}
                                </div>
                            </div>
                        </div>
                        <hr></hr>
                        <div className="row">
                            <div className="col-sm-12">
                                <div id="map-canvas">
                                    <GoogleMap
                                            id = "googleMap"
                                            musician={this.props.musician}
                                            facility={this.props.facility}
                                        />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="col-sm-10">
                                    Requests are approved by administration.
                                </div>
                                <div className="col-sm-2">
                                    <button className="btn-sm btn-default"
                                            disabled={this.state.requested}
                                            onClick={this.handleClick}
                                            type="submit">
                                            Request
                                    </button>
                                </div>
                            </div>
                        </div>
                        <hr></hr>
                        <div className="row">
                            <div className="col-sm-12">
                                {this.state.requested ? <Alert bsStyle='info'
                                                               bSize='small'
                                                               id='requested'
                                                               onDismiss={this.handleAlertDismiss}
                                                               dismissAfter={2000}>
                                    <strong>Event Request Submitted</strong>
                                    <p>A request has been sent to the site administrator for approval.</p>
                                    </Alert> : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = EventDetails;