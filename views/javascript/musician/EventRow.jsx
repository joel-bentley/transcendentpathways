var React = require('react');
var GetDistance = require('./GetDistance.jsx');
var GoogleMap = require('./GoogleMap.jsx');

var EventRow = React.createClass({
    handleClick: function(){


    },
    render: function(){

        return(
            <div className="panel panel-primary" key={event._id}>
                <div className="panel-heading">
                    <h4 className="panel-title"> {this.props.event.facilityName + ' on ' +
                    new Date(this.props.event.start).toDateString()} </h4>
                </div>
                <div className="panel-body">
                    <div className = "container-fluid">
                        <div className="row">
                            <div className="col-sm-5">
                                <h5 className="text-center">
                                <div >Start Date: {new Date(this.props.event.start).toDateString()}</div>
                                <div>Facility Name: {this.props.event.facilityName}</div>
                                <div>Start Time: {new Date(this.props.event.start).toLocaleTimeString().replace(/:\d\d([ ap]|$)/, " ")}</div>
                                <div>End Time: {new Date(this.props.event.end).toLocaleTimeString().replace(/:\d\d([ ap]|$)/, " ")}</div>
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
                                    <button className="btn btn-primary"  type="submit">Request Event  *</button>
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