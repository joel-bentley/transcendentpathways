var React = require('react');

var StatusCard = React.createClass({
    render: function() {
        return(
            <div className="panel panel-default">
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
                                        <h5>{new Date(this.props.event.startTime).toDateString()}</h5>
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

                            <div className="col-sm-2">
                                <button type="button" className="btn btn-default">Requested</button>
                            </div>
                            <div className="col-sm-2">
                                <button type="button" className="btn btn-default">Approved</button>
                            </div>
                            <div className="col-sm-2">
                                <button type="button" className="btn btn-default">Complete</button>
                            </div>
                            <div className="col-sm-2">
                                <button type="button" className="btn btn-default">Canceled</button>
                            </div>
                            <div className="col-sm-2">
                                <button type="button" className="btn btn-info">Open</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = StatusCard;