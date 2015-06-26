var React = require('react/addons');

var FacilityRow = React.createClass({
    propTypes: {
        facility: React.PropTypes.any.isRequired,
        showDetails: React.PropTypes.func.isRequired
    },
    changeState: function(){
        var facility=this.props.facility;
        this.props.showDetails(facility);
    },
    render: function() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <div className="panel-title">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-xs-9">
                                    <h5>{this.props.facility.facilityName}</h5>
                                </div>
                                <div className="col-xs-3">
                                    <button
                                        type="button"
                                        className={this.props.facility.approved ? "btn-sm btn-default glyphicon glyphicon-list":
                                            "btn-sm btn-primary glyphicon glyphicon-list"}
                                        onClick={this.changeState}
                                    >
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="panel-body">
                    <div className="container-fluid">
                        <div className="row">
                            Facility Contact:
                        </div>
                        <div className="row">
                            {this.props.facility.contactName}
                        </div>
                        <div className="row">
                            {this.props.facility.contactPhone}
                        </div>
                        <div className="row">
                            {this.props.facility.contactEmail}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = FacilityRow;