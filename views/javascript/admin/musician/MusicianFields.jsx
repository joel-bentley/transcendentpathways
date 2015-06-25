var React = require('react/addons');

var MusicianFields = React.createClass({
    render: function() {
        return (
            <div className="panel panel-default slideTransition" >
                <div className="panel-heading">
                    <div className="panel-title">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-xs-8">
                                    <span style={{color: 'blue'}}>
                                        <h5>{this.props.fieldValues.performerName}</h5>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="panel-body">
                    <div className="container-fluid">
                        <form className="form-horizontal">
                            <div className="form-group">
                                <label className="col-sm-4 control-label">Contact Name</label>
                                <div className="col-sm-7">
                                    <input type="text" className="form-control" ref="contactName"
                                           defaultValue={this.props.fieldValues.contactName}
                                           key={this.props.fieldValues.performerName} />
                                </div>
                            </div>
                            <div className ="form-group">
                                <label className="col-sm-4 control-label">Phone</label>
                                <div className="col-sm-7">
                                    <input type="text" className="form-control" ref="phone"
                                           defaultValue={this.props.fieldValues.phone}
                                           key={this.props.fieldValues.performerName} />
                                </div>
                            </div>
                            <div className ="form-group">
                                <label className="col-sm-4 control-label">Address Line 1</label>
                                <div className="col-sm-7">
                                    <input type="text" className="form-control" ref="address1"
                                           defaultValue={this.props.fieldValues.address1}
                                           key={this.props.fieldValues.performerName} />
                                </div>
                            </div>
                            <div className ="form-group">
                                <label className="col-sm-4 control-label">Address Line 2</label>
                                <div className="col-sm-7">
                                    <input type="text" className="form-control" ref="address2"
                                           defaultValue={this.props.fieldValues.address2}
                                           key={this.props.fieldValues.performerName} />
                                </div>
                            </div>
                            <div className ="form-group">
                                <label className="col-sm-4 control-label">City</label>
                                <div className="col-sm-7">
                                    <input type="text" className="form-control" ref="city"
                                           defaultValue={this.props.fieldValues.city}
                                           key={this.props.fieldValues.performerName} />
                                </div>
                            </div>
                            <div className ="form-group">
                                <label className="col-sm-4 control-label">State</label>
                                <div className="col-sm-7">
                                    <input type="text" className="form-control" ref="state"
                                           defaultValue={this.props.fieldValues.state}
                                           key={this.props.fieldValues.performerName} />
                                </div>
                            </div>
                            <div className ="form-group">
                                <label className="col-sm-4 control-label">Zip Code</label>
                                <div className="col-sm-7">
                                    <input type="text" className="form-control" ref="zipcode"
                                           defaultValue={this.props.fieldValues.zipcode}
                                           key={this.props.fieldValues.performerName} />
                                </div>
                            </div>
                            <div className ="form-group">
                                <label className="col-sm-4 control-label">Website URL</label>
                                <div className="col-sm-7">
                                    <input type="text" className="form-control" ref="website"
                                           defaultValue={this.props.fieldValues.website}
                                           key={this.props.fieldValues.performerName} />
                                </div>
                            </div>
                            <div className ="form-group">
                                <label className="col-sm-4 control-label">Biography</label>
                                <div className="col-sm-7">
                                    <textarea className="form-control"  rows="2"
                                              ref="biography" defaultValue={this.props.fieldValues.biography}
                                              key={this.props.fieldValues.performerName} />
                                </div>
                            </div>
                            <div className ="form-group">
                                <label className="col-sm-4 control-label">Instruments</label>
                                <div className="col-sm-7">
                                    <textarea className="form-control"  rows="2"
                                              ref="instruments" defaultValue={this.props.fieldValues.instruments}
                                              key={this.props.fieldValues.performerName} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-4 control-label">Picture</label>
                                <div className="col-sm-7">
                                    <input type="text" className="form-control" ref="picture"
                                           defaultValue={this.props.fieldValues.picture}
                                           key={this.props.fieldValues.performerName} />
                                </div>
                            </div>
                            <div className ="form-group">
                                <label className="col-sm-4 control-label">Approval Date</label>
                                <div className="col-sm-7">
                                    <input type="text" className="form-control" ref="approvedDate"
                                           defaultValue={this.props.fieldValues.approvedDate}
                                           key={this.props.fieldValues.performerName} />
                                </div>
                            </div>
                            <div className ="form-group">
                                <label className="col-sm-4 control-label">Approved By</label>
                                <div className="col-sm-7">
                                    <input type="text" className="form-control" ref="approvedBy"
                                           defaultValue={this.props.fieldValues.approvedBy}
                                           key={this.props.fieldValues.performerName} />
                                </div>
                            </div>
                            <div className ="form-group">
                                <label className="col-sm-4 control-label">Sign-Up Date</label>
                                <div className="col-sm-7">
                                    <input type="text" className="form-control" ref="signUpDate"
                                           defaultValue={this.props.fieldValues.signUpDate}
                                           key={this.props.fieldValues.performerName} />
                                </div>
                            </div>
                            <div className ="form-group">
                                <label className="col-sm-4 control-label">Approved To Perform</label>
                                <div className="col-sm-7">
                                    <select className="form-control" defaultValue={this.props.fieldValues.approved}
                                            ref="approved" key={this.props.fieldValues.performerName} >
                                        <option value="">No</option>
                                        <option value="true">Yes</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <button className="btn btn-primary" onClick={this.saveAndContinue}>Submit</button>
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
            //performerName: this.refs.performerName.getDOMNode().value,
            contactName: this.refs.contactName.getDOMNode().value,
            phone: this.refs.phone.getDOMNode().value,
            address1: this.refs.address1.getDOMNode().value,
            address2: this.refs.address2.getDOMNode().value,
            city: this.refs.city.getDOMNode().value,
            state: this.refs.state.getDOMNode().value,
            zipcode: this.refs.zipcode.getDOMNode().value,
            website: this.refs.website.getDOMNode().value,
            biography: this.refs.biography.getDOMNode().value,
            instruments: this.refs.instruments.getDOMNode().value,
            picture: this.refs.picture.getDOMNode().value,
            approvedDate: this.refs.approvedDate.getDOMNode().value,
            approvedBy: this.refs.approvedBy.getDOMNode().value,
            signUpDate: this.refs.signUpDate.getDOMNode().value,
            approved: this.refs.approved.getDOMNode().value
        };
        this.props.saveValues(data);


    }
});

module.exports = MusicianFields;