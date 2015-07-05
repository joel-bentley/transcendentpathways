var React = require('react');
var GetDistance = require('./GetDistance.jsx');
var GoogleMap = require('./GoogleMap.jsx');

var moment = require('moment');

var EventDetails = React.createClass({
    componentDidMount: function(){
        this.placeDiv(0,this.props.offset);
    },
    componentDidUpdate: function(){
        this.placeDiv(0,this.props.offset);
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
    },

    render: function(){
        return(
            <div className="panel panel-default slideTransition" key={event._id}>
                <div className="panel-heading">
                    {this.props.event.facilityName + ' on ' + moment.utc(this.props.event.start).format('dddd MMMM D, YYYY')}
                </div>
                <div className="panel-body">
                    <div className = "container-fluid">
                        <div className="row">
                            <div className="col-sm-12">
                                <div >Event Date: {moment.utc(this.props.event.start).format('dddd MMMM D, YYYY')}</div>
                                <div>Facility Name: {this.props.event.facilityName}</div>
                                <div>Start Time: {moment.utc(this.props.event.start).format('h:mm a')}</div>
                                <div>End Time: {moment.utc(this.props.event.end).format('h:mm a')}</div>
                                <div>{this.props.musician && this.props.facility ?
                                    <GetDistance
                                        musician={this.props.musician}
                                        facility={this.props.facility}
                                    /> : null }
                                </div>
                                <hr></hr>
                                <div className="panel panel-info panel-heading">
                                    {this.props.event.description}
                                </div>
                            </div>
                        </div>
                        <div>
                            <hr></hr>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <div id="map-canvas">
                                    {this.props.musician && this.props.facility ?<GoogleMap
                                            musician={this.props.musician}
                                            facility={this.props.facility}
                                        />: null
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="col-sm-8">
                                    <p className="text-center"> * Requests are submitted for approval by administration.</p>
                                </div>
                                <div className="col-sm-4 pull-right">
                                    <button className="btn-sm btn-default" onClick={this.handleClick} type="submit">Request Event*</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = EventDetails;