var React = require('react');
var moment = require('moment');

var EventsPanel = React.createClass({

    render: function() {
        var panelClass = "panel " + this.props.panelClass;

        return (
            this.props.eventType ? <div className={panelClass} key={this.props.key}>
                <div className="panel-heading">
                    <div className="container-fluid">
                        <div className="row-fluid">
                            <div className="col-sm-10">
                                {this.props.eventName}
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
                <div className="panel-body collapse" id={this.props.eventType}>
                    <div className="container-fluid">
                        {this.props.events ? this.props.sortEvents() : <div>No records</div>}
                    </div>
                </div>
            </div>: <div></div>
        )
    }
});

module.exports = EventsPanel;