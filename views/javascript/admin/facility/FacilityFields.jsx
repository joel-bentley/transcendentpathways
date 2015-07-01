var React = require('react');

var FacilityFields = React.createClass({

    render: function() {
        return (

            <div className={this.props.fieldValues.approved ? "panel panel-default": "panel panel-primary"}>
                <div className="panel-heading">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-10">
                                    {this.props.fieldValues.facilityName}
                            </div>
                            <div className="col-sm-2">
                                <button
                                    className={this.props.fieldValues.approved ?
                                            "btn btn-primary btn-sm" : "btn btn-default btn-sm"}
                                    type="button"
                                    onClick={this.props.showNotes}>
                                    <span className="glyphicon glyphicon-list-alt"> Notes </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="panel-body">
                    <div className="container-fluid">
                        <form className="form-horizontal">
                            <div className="form-group">
                                <label className="col-sm-4 control-label">Address Line 1</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" ref="address1"
                                           defaultValue={this.props.fieldValues.address1}
                                           key={this.props.fieldValues.address1} />
                                </div>
                            </div>
                            <div className ="form-group">
                                <label className="col-sm-4 control-label">Address Line 2</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" ref="address2"
                                           defaultValue={this.props.fieldValues.address2}
                                           key={this.props.fieldValues.performerName} />
                                </div>
                            </div>
                            <div className ="form-group">
                                <label className="col-sm-4 control-label">City</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" ref="city"
                                           defaultValue={this.props.fieldValues.city}
                                           key={this.props.fieldValues.city} />
                                </div>
                            </div>
                            <div className ="form-group">
                                <label className="col-sm-4 control-label">State</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" ref="state"
                                           defaultValue={this.props.fieldValues.state}
                                           key={this.props.fieldValues.state} />
                                </div>
                            </div>
                            <div className ="form-group">
                                <label className="col-sm-4 control-label">Zipcode</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" ref="zipcode"
                                           defaultValue={this.props.fieldValues.zipcode}
                                           key={this.props.fieldValues.zipcode} />
                                </div>
                            </div>
                            <div className ="form-group">
                                <label className="col-sm-4 control-label">Contact Name</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" ref="contactName"
                                           defaultValue={this.props.fieldValues.contactName}
                                           key={this.props.fieldValues.contactName} />
                                </div>
                            </div>
                            <div className ="form-group">
                                <label className="col-sm-4 control-label">Contact Phone</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" ref="contactPhone"
                                           defaultValue={this.props.fieldValues.contactPhone}
                                           key={this.props.fieldValues.contactPhone} />
                                </div>
                            </div>
                            <div className ="form-group">
                                <label className="col-sm-4 control-label">Contact Email</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" ref="contactEmail"
                                           defaultValue={this.props.fieldValues.contactEmail}
                                           key={this.props.fieldValues.contactEmail} />
                                </div>
                            </div>
                            <div className ="form-group">
                                <label className="col-sm-4 control-label">Building Name</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" ref="buildingName"
                                            defaultValue={this.props.fieldValues.buildingName}
                                            key={this.props.fieldValues.buildingName} />
                                </div>
                            </div>
                            <div className ="form-group">
                                <label className="col-sm-4 control-label">Location Name</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control"ref="locationName"
                                            defaultValue={this.props.fieldValues.locationName}
                                            key={this.props.fieldValues.locationName} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-4 control-label">Room Size</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" ref="roomSize"
                                           defaultValue={this.props.fieldValues.roomSize}
                                           key={this.props.fieldValues.roomSize} />
                                </div>
                            </div>
                            <div className ="form-group">
                                <label className="col-sm-4 control-label">Security Needed</label>
                                <div className="col-sm-8">
                                    <select className="form-control" defaultValue={this.props.fieldValues.securityNeeded}
                                            ref="securityNeeded" key={this.props.fieldValues.securityNeeded}>
                                        <option value="">No</option>
                                        <option value="true">Yes</option>
                                    </select>
                                </div>
                            </div>
                            <div className ="form-group">
                                <label className="col-sm-4 control-label">Waiver Needed</label>
                                <div className="col-sm-8">
                                    <select className="form-control" defaultValue={this.props.fieldValues.waiverNeeded}
                                            ref="waiverNeeded" key={this.props.fieldValues.waiverNeeded} >
                                        <option value="">No</option>
                                        <option value="true">Yes</option>
                                    </select>
                                </div>
                            </div>
                            <div className ="form-group">
                                <label className="col-sm-4 control-label">Patient Number</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" ref="patientNumber"
                                           defaultValue={this.props.fieldValues.patientNumber}
                                           key={this.props.fieldValues.patientNumber} />
                                </div>
                            </div>
                            <div className ="form-group">
                                <label className="col-sm-4 control-label">Approved Date</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" ref="approvedDate"
                                           defaultValue={this.props.fieldValues.approvedDate}
                                           key={this.props.fieldValues.approvedDate} />
                                </div>
                            </div>
                            <div className ="form-group">
                                <label className="col-sm-4 control-label">Sign-Up Date</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" ref="signUpDate"
                                           defaultValue={this.props.fieldValues.signUpDate}
                                           key={this.props.fieldValues.signUpDate} />
                                </div>
                            </div>
                            <div className ="form-group">
                                <label className="col-sm-4 control-label">Approved By</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" ref="approvedBy"
                                           defaultValue={this.props.fieldValues.approvedBy}
                                           key={this.props.fieldValues.approvedBy} />
                                </div>
                            </div>
                            <div className ="form-group">
                                <label className="col-sm-4 control-label">Approved</label>
                                <div className="col-sm-8">
                                    <select className="form-control" defaultValue={this.props.fieldValues.approved}
                                            ref="approved" key={this.props.fieldValues.approved} >
                                        <option value="">No</option>
                                        <option value="true">Yes</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-sm-2 col-sm-offset-10">
                                <button className="btn btn-sm btn-primary" onClick={this.saveAndContinue}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    },
    saveAndContinue: function(event) {
        event.preventDefault();

        var data = {
            _id: this.props.fieldValues._id,
            notes: this.props.fieldValues.notes,
            //facilityName: this.refs.facilityName.getDOMNode().value,
            address1: this.refs.address1.getDOMNode().value,
            address2: this.refs.address2.getDOMNode().value,
            city: this.refs.city.getDOMNode().value,
            state: this.refs.state.getDOMNode().value,
            zipcode: this.refs.zipcode.getDOMNode().value,
            contactName: this.refs.contactName.getDOMNode().value,
            contactPhone: this.refs.contactPhone.getDOMNode().value,
            contactEmail: this.refs.contactEmail.getDOMNode().value,
            buildingName: this.refs.buildingName.getDOMNode().value,
            locationName: this.refs.locationName.getDOMNode().value,
            roomSize: this.refs.roomSize.getDOMNode().value,
            securityNeeded: this.refs.securityNeeded.getDOMNode().value,
            waiverNeeded: this.refs.waiverNeeded.getDOMNode().value,
            patientNumber: this.refs.patientNumber.getDOMNode().value,
            approvedDate: this.refs.approvedDate.getDOMNode().value,
            signUpDate: this.refs.signUpDate.getDOMNode().value,
            approvedBy: this.refs.approvedBy.getDOMNode().value,
            approved: this.refs.approved.getDOMNode().value

        };
        this.props.saveValues(data);


    }
});

module.exports = FacilityFields;