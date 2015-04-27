var React = require('react/addons');
//var _ = require('lodash');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var MusicianFields = React.createClass({
    render: function() {
        return (
            <div>
                <form className="form-horizontal">
                    <div className="form-group">
                        <label className="col-sm-4 control-label"> Peformer Name</label>
                        <div>
                            <input type="text" className="col-sm-7" ref="performerName"
                                   defaultValue={this.props.fieldValues.performerName} />
                        </div>
                    </div>
                    <div className ="form-group">
                        <label className="col-sm-4 control-label">Phone</label>
                        <div>
                            <input type="text" className="col-sm-7" ref="phone"
                                   defaultValue={this.props.fieldValues.phone} />
                        </div>
                    </div>
                    <div className ="form-group">
                        <label className="col-sm-4 control-label">Address Line 1</label>
                        <div>
                            <input type="text" className="col-sm-7" ref="address1"
                                   defaultValue={this.props.fieldValues.address1} />
                        </div>
                    </div>
                    <div className ="form-group">
                        <label className="col-sm-4 control-label">Address Line 2</label>
                        <div>
                            <input type="text" className="col-sm-7" ref="address2"
                                   defaultValue={this.props.fieldValues.address2} />
                        </div>
                    </div>
                    <div className ="form-group">
                        <label className="col-sm-4 control-label">City</label>
                        <div>
                            <input type="text" className="col-sm-7" ref="city"
                                   defaultValue={this.props.fieldValues.city} />
                        </div>
                    </div>
                    <div className ="form-group">
                        <label className="col-sm-4 control-label">State</label>
                        <div>
                            <input type="text" className="col-sm-7" ref="state"
                                   defaultValue={this.props.fieldValues.state} />
                        </div>
                    </div>
                    <div className ="form-group">
                        <label className="col-sm-4 control-label">Zip Code</label>
                        <div>
                            <input type="text" className="col-sm-7" ref="zipcode"
                                   defaultValue={this.props.fieldValues.zipcode} />
                        </div>
                    </div>
                    <div className ="form-group">
                        <label className="col-sm-4 control-label">Website URL</label>
                        <div>
                            <input type="text" className="col-sm-7" ref="website"
                                   defaultValue={this.props.fieldValues.website} />
                        </div>
                    </div>
                    <div className ="form-group">
                        <label className="col-sm-4 control-label">References</label>
                        <div>
                            <textarea className="col-sm-7"  rows="2"
                                      ref="references" defaultValue={this.props.fieldValues.references} />
                        </div>
                    </div>
                    <div className ="form-group">
                        <label className="col-sm-4 control-label">Instruments</label>
                        <div>
                            <textarea className="col-sm-7"  rows="2"
                                      ref="instruments" defaultValue={this.props.fieldValues.instruments} />
                        </div>
                    </div>
                    <div className ="form-group">
                        <label className="col-sm-4 control-label">Approval Date</label>
                        <div>
                            <input type="text" className="col-sm-7" ref="approvalDate"
                                   defaultValue={this.props.fieldValues.approvalDate} />
                        </div>
                    </div>
                    <div className ="form-group">
                        <label className="col-sm-4 control-label">Approved By</label>
                        <div>
                            <input type="text" className="col-sm-7" ref="approvedBy"
                                   defaultValue={this.props.fieldValues.approvedBy} />
                        </div>
                    </div>
                    <div className ="form-group">
                        <label className="col-sm-4 control-label">Sign-Up Date</label>
                        <div>
                            <input type="text" className="col-sm-7" ref="signUpDate"
                                   defaultValue={this.props.fieldValues.signUpDate} />
                        </div>
                    </div>
                    <div className ="form-group">
                        <label className="col-sm-4 control-label">Approved To Perform</label>
                        <div>
                            <select className="col-sm-7" defaultValue={this.props.fieldValues.approvedToPerform}
                                    ref="approvedToPerform">
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
        )
    },
    saveAndContinue: function(event) {
        event.preventDefault();

        var data = {
            _id: this.props.fieldValues._id,
            performerName: this.refs.performerName.getDOMNode().value,
            phone: this.refs.phone.getDOMNode().value,
            address1: this.refs.address1.getDOMNode().value,
            address2: this.refs.address2.getDOMNode().value,
            city: this.refs.city.getDOMNode().value,
            state: this.refs.state.getDOMNode().value,
            zipcode: this.refs.zipcode.getDOMNode().value,
            website: this.refs.website.getDOMNode().value,
            references: this.refs.references.getDOMNode().value,
            instruments: this.refs.instruments.getDOMNode().value,
            approvalDate: this.refs.approvalDate.getDOMNode().value,
            approvedBy: this.refs.approvedBy.getDOMNode().value,
            signUpDate: this.refs.signUpDate.getDOMNode().value,
            approvedToPerform: this.refs.approvedToPerform.getDOMNode().value
        };
        this.props.saveValues(data);
    }
});

var DetailsBar = React.createClass({
    render: function(){
        return (
            <div className="Detail">

                <div className="panel-body">
                    <MusicianFields  fieldValues = {this.props.musician}
                                     saveValues = {this.props.saveValues}
                        />
                </div>

            </div>
        )}
});

var MusicianRow = React.createClass({
    propTypes: {
        musician: React.PropTypes.any.isRequired,
        showDetails: React.PropTypes.func.isRequired
    },
    changeState: function(musician){
        this.props.showDetails(musician);
    },
    render: function() {
        var name = this.props.musician.approvedToPerform ?
            this.props.musician.performerName :<span style={{color: 'red'}}>
                {this.props.musician.performerName}
            </span>;
        return (
            <a href="#" className="list-group-item" key={this.props.musician._id}
               onClick={this.changeState.bind(this, this.props.musician)}> {name} </a>
        );
    }
});

var MusicianTable = React.createClass({
    propTypes: {
        musicians: React.PropTypes.array.isRequired
    },
    getInitialState: function(){
        return {
            musicians: this.props.musicians,
            showResults: false,
            musician: null
        }
    },
    showDetails: function(musician){
        this.setState({
            showResults: !this.state.showResults,
            musician: musician
        })
    },
    saveValues: function(fields) {
        var x = this.state.musician;
        x._id = fields._id;
        x.performerName = fields.performerName;
        x.phone = fields.phone;
        x.address1 = fields.address1;
        x.address2 = fields.address2;
        x.city = fields.city;
        x.state = fields.state;
        x.zipcode = fields.zipcode;
        x.website = fields.website;
        x.references = fields.references;
        x.instruments = fields.instruments;
        x.approvedDate = fields.approvedDate;
        x.approvedBy = fields.approvedBy;
        x.signUpDate = fields.signUpDate;
        x.approvedToPerform = fields.approvedToPerform;

        this.handleChangedData(x);
    },
    handleChangedData: function(musician){
        var x = this.state.musicians;
        x.forEach(function(elem,index){
            if (elem._id===musician._id){
                x[index] = musician;
            }
        }.bind(this));
        this.setState({
            musicans: x,
            musician: musician,
            showResults: false
        });
    },
    render: function() {
        var rowsApproved = [];
        var rowsNotApproved = [];
        this.state.musicians.forEach(function(musician) {
            if (musician.approvedToPerform != false){
                rowsApproved.push(
                    <MusicianRow
                        musician = {musician}
                        key = {musician.performerName}
                        showDetails={this.showDetails}
                        />
                );
            } else {
                rowsNotApproved.push(
                    <MusicianRow
                        musician = {musician}
                        key= {musician.performerName}
                        showDetails={this.showDetails}
                        />
                );
            }
        }.bind(this));
        return (
            <div className="col-sm-4">
                <div className="list-group PerformerList">
                    <a href="#" className="list-group-item active"> Performer List</a>
                    {rowsNotApproved} {rowsApproved}
                </div>
                <div>
                    <ReactCSSTransitionGroup transitionName="example">
                        {this.state.showResults ? <DetailsBar musician={this.state.musician}
                            handleChangedData={this.handleChangedData} saveValues={this.saveValues} />: null }
                    </ReactCSSTransitionGroup>
                </div>
            </div>
        );
    }
});

var MUSICIANS = [
    {
        "_id": "55366eafc0d4f65c3233726d",
        "performerName": "Quadeebo",
        "address1": "8488 Dobbin Street",
        "address2": "Suite 343",
        "city": "Belgreen",
        "state": "South Carolina",
        "zipcode": 69914,
        "phone": "(968) 578-3100",
        "website": "www.incididunt.com",
        "references": [
            "commodo in ullamco",
            "sunt eu ad",
            "esse qui ullamco",
            "enim eiusmod laboris",
            "amet minim Lorem",
            "enim nostrud irure",
            "eu adipisicing non"
        ],
        "instruments": [
            "occaecat",
            "ea",
            "eu",
            "elit",
            "do",
            "esse",
            "commodo"
        ],
        "approvedToPerform": false,
        "approvedDate": "2014-03-18",
        "signUpDate": "2014-02-08",
        "approvedBy": "Mark Ackerly"
    },
    {
        "_id": "55366eafd5e8495d9816cf62",
        "performerName": "Inventure",
        "address1": "8630 Sumner Place",
        "address2": "Suite 483",
        "city": "Alden",
        "state": "South Dakota",
        "zipcode": 14431,
        "phone": "(986) 498-3001",
        "website": "www.magna.com",
        "references": [
            "ea commodo duis",
            "in dolor deserunt",
            "qui amet et",
            "incididunt tempor in",
            "aute proident voluptate",
            "duis ea magna",
            "exercitation dolore dolore"
        ],
        "instruments": [
            "laboris",
            "ad",
            "commodo",
            "proident",
            "non",
            "elit",
            "adipisicing"
        ],
        "approvedToPerform": false,
        "approvedDate": "2014-08-31",
        "signUpDate": "2014-09-19",
        "approvedBy": "Mark Ackerly"
    }
];

React.render(<MusicianTable musicians={MUSICIANS} />, document.getElementById("codepenApp"));

