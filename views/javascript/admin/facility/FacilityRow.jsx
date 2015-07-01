var React = require('react/addons');

var FacilityRow = React.createClass({
    propTypes: {
        facility: React.PropTypes.any.isRequired,
        showDetails: React.PropTypes.func.isRequired
    },
    changeState: function(){
        var facility=this.props.facility;
        this.props.showDetails(facility);
        var bodyRect = document.body.getBoundingClientRect(),
            elemRect = this.getDOMNode().getBoundingClientRect(),
            offset   = elemRect.top - bodyRect.top;
        this.props.renderOffset(offset);
    },
    render: function() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-9">
                                {this.props.facility.facilityName}
                            </div>
                            <div className="col-sm-3">
                                <button
                                    className={this.props.facility.approved ?
                                        "btn btn-sm btn-info" : "btn btn-sm btn-primary"}
                                    type="button"
                                    onClick={this.changeState}>
                                    <span className="glyphicon glyphicon-list"></span>
                                </button>
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