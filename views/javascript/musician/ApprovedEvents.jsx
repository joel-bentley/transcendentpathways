var React = require('react');

var ApprovedEvents = React.createClass ({

    render: function(){
        return (
            <div className="panel panel-success">
                <div className="panel-heading">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-12">
                                Approved Events
                            </div>
                        </div>
                    </div>
                </div>
                <div className="panel-body">
                    <div className="container-fluid">
                        <div className="row">
                            {this.props.approvedEvents}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = ApprovedEvents;