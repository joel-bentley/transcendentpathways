var React = require('react');

var FacilityContact = React.createClass({

    render: function(){
        return(
            <div>
                <div className="row">
                    <div className="col-xs-10 col-xs-offset-1">
                        <h5>Facility Contact {this.props.facility.contactName}
                        </h5>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-10 col-xs-offset-3">
                        <h5>Phone {this.props.facility.contactPhone}</h5>
                    </div>
                </div>

            </div>
        );
    }
});

module.exports = FacilityContact;