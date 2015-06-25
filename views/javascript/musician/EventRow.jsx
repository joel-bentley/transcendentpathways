var React = require('react');
var GetDistance = require('./GetDistance.jsx');
var GoogleMap = require('./GoogleMap.jsx');

var EventRow = React.createClass({
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
            //this.props.event.status.requested = true;
        }
    this.props.updateEvent(this.props.event);
    },
    render: function(){
        //console.log('logging props in row', this.props);
        return(
            <div className="panel panel-primary" key={event._id}>
                <div className="panel-heading">
                    <h4 className="panel-title"> {this.props.event.facilityName + ' on ' +
                    moment.utc(this.props.event.start).format('dddd MMMM D, YYYY')} </h4>
                </div>
                <div className="panel-body">
                    <div className = "container-fluid">
                        <div className="row">
                            <div className="col-sm-5">
                                <h5 className="text-center">
                                <div >Start Date: {moment.utc(this.props.event.start).format('dddd MMMM D, YYYY')}</div>
                                <div>Facility Name: {this.props.event.facilityName}</div>
                                <div>Start Time: {moment.utc(this.props.event.start).format('h:mm a')}</div>
                                <div>End Time: {moment.utc(this.props.event.end).format('h:mm a')}</div>
                                <div>{this.props.musician  && this.props.facility?
                                    <GetDistance
                                        musician={this.props.musician}
                                        facility={this.props.facility}
                                        /> :
                                    null}
                                </div>
                                </h5>

                            </div>
                            <div id="map-canvas">
                                {this.props.musician && this.props.facility ? <GoogleMap musician={this.props.musician} facility={this.props.facility}/>: null}
                            </div>
                            <row>
                                <div className="col-sm-12">
                                    <div className="col-sm-5">
                                    <p className="text-center"> * Request does not imply, in any way, that you will be approved for this event!</p>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-sm-offset-1">
                                    <button className="btn btn-primary" onClick={this.handleClick} type="submit">Request Event  *</button>
                                </div>
                            </row>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = EventRow;