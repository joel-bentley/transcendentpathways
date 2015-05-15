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
        var name = this.props.facility.approved ?
            this.props.facility.facilityName :<span style={{color: 'blue'}}>
                <h5>{this.props.facility.facilityName}</h5>
            </span>;
        return (
            <a href="#" className="list-group-item" key={this.props.facility._id}
               onClick={this.changeState}><h5> {name}</h5> </a>
        );
    }
});

module.exports = FacilityRow;