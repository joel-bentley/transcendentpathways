var React = require('react');

var UpcomingEvents = React.createClass({
    render: function(){
        return (
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-12">
                                Upcoming Events
                            </div>
                        </div>
                    </div>
                </div>
                <div className="panel-body">
                    <div className="container-fluid">
                        <div className="row">
                            {this.props.upcomingEvents}
                        </div>
                    </div>
                </div>
            </div>
        );

    }
});

module.exports = UpcomingEvents;