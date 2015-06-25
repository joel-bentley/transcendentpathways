var React = require('react');

var moment = require('moment');

var StatusIndicator = require('./StatusIndicator.jsx');
var RequestedBy = require('./RequestedBy.jsx');
var ApprovedMusician = require('./ApprovedMusician.jsx');
var PaymentStatus = require('./PaymentStatus.jsx');
var CancelEvent = require('./CancelEvent.jsx');

var StatusCard = React.createClass({
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
        d.style.top = y_pos-155+'px';
    },
    render: function() {

        return(
            <div className="panel panel-default slideTransition" >
                <div className="panel-heading">
                    <div className="panel-title">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-xs-8">
                                    <span style={{color: 'blue'}}>
                                        <h5>{this.props.event.facilityName}</h5>
                                    </span>
                                </div>
                                <div className="col-xs-4">
                                    <span style={{color: 'blue'}}>
                                        <h5>{moment.utc(this.props.event.start).format('dddd MMMM D, YYYY')}</h5>
                                    </span>
                                </div>
                            </div>
                            <div className="row">

                            </div>
                        </div>
                    </div>
                </div>
                <div className="panel-body">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-1">
                            </div>
                            <div className="col-sm-2 " style={{'textAlign': 'center'}}>
                                <StatusIndicator
                                    statusText = {'Created by Facility'}
                                    status = {this.props.event.status.open}
                                />
                            </div>
                            <div className="col-sm-2" style={{'textAlign': 'center'}}>
                                <StatusIndicator
                                    statusText = {'Requests Pending'}
                                    status = {this.props.event.status.requested}
                                />
                            </div>
                            <div className="col-sm-2" style={{'textAlign': 'center'}}>
                                <StatusIndicator
                                    statusText = {'Performer Approved'}
                                    status = {this.props.event.status.approved}
                                />
                            </div>
                            <div className="col-sm-2" style={{'textAlign': 'center'}}>
                                <StatusIndicator
                                    statusText = {'Event Canceled'}
                                    status = {this.props.event.status.canceled}
                                />
                            </div>
                            <div className="col-sm-2" style={{'textAlign': 'center'}}>
                                <StatusIndicator
                                    statusText = {'Event Complete'}
                                    status = {this.props.event.status.completed}
                                />
                            </div>
                        </div>
                        <div className='row'>
                            <hr><h4>Performer Status</h4></hr>
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                <RequestedBy
                                    musicians={this.props.event.requestedBy}
                                    event={this.props.event}
                                    updateEvent = {this.props.updateEvent}
                                    enableSave = {this.props.enableSave}
                                />
                            </div>
                            <div className="col-sm-6">
                                <ApprovedMusician
                                    event = {this.props.event}
                                    allowSave = {this.props.allowSave}
                                    enableSave = {this.props.enableSave}
                                />
                            </div>
                        </div>
                        <div className='row'>
                            <hr></hr>
                        </div>
                        <div className='row'>
                            <hr><h4>Payment Status</h4></hr>
                        </div>
                        <div className='row'>
                            <div className="col-sm-10 col-sm-1-offset">
                                <PaymentStatus
                                    event = {this.props.event}
                                    updateEvent = {this.props.updateEvent}
                                    enableSave = {this.props.enableSave}
                                />
                            </div>
                        </div>
                        <div className='row'>
                            <hr><h4>Cancel Event</h4></hr>
                        </div>
                        <div className='row'>
                            <div className="col-sm-10 col-sm-1-offset">
                                <CancelEvent
                                    event = {this.props.event}
                                    updateEvent = {this.props.updateEvent}
                                    enableSave = {this.props.enableSave}
                                    />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = StatusCard;