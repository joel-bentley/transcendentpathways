var React = require('react');
var moment = require('moment');

var EventsPanel = React.createClass({

    changeState: function( event,type) {
        this.props.eventChange( event, type);
        var bodyRect = document.body.getBoundingClientRect(),
            elemRect = document.getElementById('event: '+event._id).getBoundingClientRect(),
            offset = elemRect.top - bodyRect.top;
        this.props.renderOffset(offset);
    },

    render: function() {
        var panelClass = "panel " + this.props.panelClass;
        var eventRows = [];
        this.props.events.map(function(event){
            eventRows.push (
                <div className="panel panel-default" key={event._id}>
                    <div className="panel-heading">
                        <div className="row">
                            <div className="col-sm-9">
                                {event.facilityName}
                            </div>
                            <div className="col-sm-3">
                                <button
                                    id = {"event: " + event._id}
                                    className="btn-xs btn-default"
                                    type="button"
                                    onClick={this.changeState.bind(this, event, this.props.eventType)}>
                                    <span className="glyphicon glyphicon-triangle-right"
                                          aria-hidden="true"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="panel-body">
                        <div>Date: {moment.utc(event.start).format('dddd MMMM D, YYYY')}</div>
                        <div>Facility Name: {event.facilityName}</div>
                        <div>Start Time: {moment.utc(event.start).format('h:mm a')}</div>
                        <div>End Time: {moment.utc(event.end).format('h:mm a')}</div>
                    </div>
                </div>
            )
        }.bind(this));


        return (
            <div className={panelClass} key={this.props.key}>
                <div className="panel-heading">
                    <div className="container-fluid">
                        <div className="row-fluid">
                            <div className="col-sm-10">
                                {this.props.eventName + " " }
                                <a href="#"> <span className    ="badge"> {"  " + this.props.count+ "  "} </span></a>
                            </div>
                            <div className="col-sm-2">
                                <button className="btn-xs btn-info"
                                        type="button"
                                        data-toggle="collapse"
                                        data-target={"#" + this.props.eventType}>
                                    <span className="glyphicon glyphicon-triangle-bottom" ></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="panel-body collapse" id={this.props.eventType} >
                        <div className="container-fluid">
                            {eventRows}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});


module.exports = EventsPanel;