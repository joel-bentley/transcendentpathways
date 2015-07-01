var React = require('react');

var RequestedEvents = React.createClass ({

    render: function(){

        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-12">
                                Requested Events
                            </div>
                        </div>
                    </div>
                </div>
                <div className="panel-body">
                    <div className="container-fluid">
                        <div className="row">
                            {this.props.requestedEvents}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = RequestedEvents;