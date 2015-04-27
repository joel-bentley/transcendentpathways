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

        // Get values via this.refs
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
    },
    {
        "_id": "55366eaf44dc300ec591ca3f",
        "performerName": "Junipoor",
        "address1": "5158 Ferry Place",
        "address2": "Suite 366",
        "city": "Longoria",
        "state": "Washington",
        "zipcode": 82740,
        "phone": "(831) 496-3398",
        "website": "www.fugiat.com",
        "references": [
            "quis consequat nulla",
            "excepteur officia ad",
            "Lorem voluptate do",
            "commodo voluptate culpa",
            "reprehenderit aliquip nulla",
            "laborum aliqua reprehenderit",
            "voluptate excepteur deserunt"
        ],
        "instruments": [
            "reprehenderit",
            "veniam",
            "minim",
            "commodo",
            "dolore",
            "laboris",
            "ut"
        ],
        "approvedToPerform": true,
        "approvedDate": "2014-12-28",
        "signUpDate": "2015-02-17",
        "approvedBy": "Mark Ackerly"
    },
    {
        "_id": "55366eaff3c67e84f117ca54",
        "performerName": "Darwinium",
        "address1": "2411 Opal Court",
        "address2": "Suite 310",
        "city": "Martinez",
        "state": "Rhode Island",
        "zipcode": 29537,
        "phone": "(974) 407-3003",
        "website": "www.labore.com",
        "references": [
            "sunt duis magna",
            "nostrud mollit Lorem",
            "est cupidatat quis",
            "ut laboris aliquip",
            "eu magna anim",
            "enim exercitation ea",
            "ut anim velit"
        ],
        "instruments": [
            "anim",
            "commodo",
            "reprehenderit",
            "tempor",
            "fugiat",
            "in",
            "commodo"
        ],
        "approvedToPerform": false,
        "approvedDate": "2015-01-15",
        "signUpDate": "2015-03-18",
        "approvedBy": "Mark Ackerly"
    },
    {
        "_id": "55366eaf5d9d8cbefae3c735",
        "performerName": "Prosure",
        "address1": "1201 Branton Street",
        "address2": "Suite 650",
        "city": "Marbury",
        "state": "Vermont",
        "zipcode": 25907,
        "phone": "(971) 558-2257",
        "website": "www.incididunt.com",
        "references": [
            "laborum reprehenderit consectetur",
            "eu incididunt adipisicing",
            "enim ipsum nostrud",
            "magna ullamco sint",
            "veniam do consequat",
            "aliqua non in",
            "minim mollit deserunt"
        ],
        "instruments": [
            "labore",
            "eu",
            "laboris",
            "cillum",
            "velit",
            "cillum",
            "est"
        ],
        "approvedToPerform": false,
        "approvedDate": "2014-01-26",
        "signUpDate": "2014-07-07",
        "approvedBy": "Mark Ackerly"
    },
    {
        "_id": "55366eaf4691b6dd39f648fb",
        "performerName": "Neocent",
        "address1": "9536 Eldert Street",
        "address2": "Suite 287",
        "city": "Aberdeen",
        "state": "California",
        "zipcode": 20475,
        "phone": "(929) 473-2201",
        "website": "www.Lorem.com",
        "references": [
            "nisi qui laboris",
            "voluptate aliqua minim",
            "laborum incididunt occaecat",
            "culpa mollit incididunt",
            "veniam qui cupidatat",
            "reprehenderit sint qui",
            "ad consequat nulla"
        ],
        "instruments": [
            "proident",
            "exercitation",
            "consectetur",
            "aliqua",
            "esse",
            "eu",
            "in"
        ],
        "approvedToPerform": true,
        "approvedDate": "2014-10-27",
        "signUpDate": "2014-02-05",
        "approvedBy": "Mark Ackerly"
    },
    {
        "_id": "55366eaf1ad07684c5deeb0b",
        "performerName": "Cubix",
        "address1": "1287 McClancy Place",
        "address2": "Suite 477",
        "city": "Homeland",
        "state": "Colorado",
        "zipcode": 42636,
        "phone": "(852) 576-2612",
        "website": "www.dolore.com",
        "references": [
            "nisi qui ex",
            "nisi cillum sint",
            "nisi exercitation consequat",
            "commodo nulla sit",
            "duis id ea",
            "Lorem ullamco sit",
            "ipsum laborum laboris"
        ],
        "instruments": [
            "labore",
            "reprehenderit",
            "do",
            "excepteur",
            "eu",
            "nulla",
            "excepteur"
        ],
        "approvedToPerform": false,
        "approvedDate": "2014-05-03",
        "signUpDate": "2014-11-16",
        "approvedBy": "Mark Ackerly"
    },
    {
        "_id": "55366eaf82c06fbf34ea8859",
        "performerName": "Telpod",
        "address1": "7613 Amboy Street",
        "address2": "Suite 841",
        "city": "Escondida",
        "state": "New York",
        "zipcode": 53489,
        "phone": "(925) 419-2231",
        "website": "www.ea.com",
        "references": [
            "labore incididunt eiusmod",
            "minim deserunt Lorem",
            "eiusmod do est",
            "dolore enim excepteur",
            "esse fugiat proident",
            "consectetur ad non",
            "mollit voluptate velit"
        ],
        "instruments": [
            "nulla",
            "eiusmod",
            "aliquip",
            "officia",
            "nisi",
            "reprehenderit",
            "cillum"
        ],
        "approvedToPerform": false,
        "approvedDate": "2014-09-28",
        "signUpDate": "2014-07-04",
        "approvedBy": "Mark Ackerly"
    },
    {
        "_id": "55366eaf6e2fed21ea2ee88f",
        "performerName": "Ziggles",
        "address1": "1811 Hutchinson Court",
        "address2": "Suite 259",
        "city": "Strong",
        "state": "Montana",
        "zipcode": 22165,
        "phone": "(806) 461-2498",
        "website": "www.minim.com",
        "references": [
            "dolore occaecat exercitation",
            "irure irure qui",
            "eu consectetur laborum",
            "id nostrud ipsum",
            "proident esse sit",
            "esse occaecat amet",
            "officia est aliqua"
        ],
        "instruments": [
            "nulla",
            "consectetur",
            "occaecat",
            "dolore",
            "reprehenderit",
            "non",
            "aliqua"
        ],
        "approvedToPerform": true,
        "approvedDate": "2014-01-29",
        "signUpDate": "2014-05-11",
        "approvedBy": "Mark Ackerly"
    },
    {
        "_id": "55366eafbbfd55cb0da47bfa",
        "performerName": "Recognia",
        "address1": "7830 Beverley Road",
        "address2": "Suite 158",
        "city": "Bourg",
        "state": "Alaska",
        "zipcode": 99337,
        "phone": "(827) 431-3299",
        "website": "www.pariatur.com",
        "references": [
            "dolore ad voluptate",
            "aliquip occaecat enim",
            "reprehenderit labore ut",
            "incididunt irure amet",
            "ipsum nostrud quis",
            "occaecat voluptate esse",
            "est laboris dolore"
        ],
        "instruments": [
            "veniam",
            "fugiat",
            "labore",
            "est",
            "ullamco",
            "eiusmod",
            "cupidatat"
        ],
        "approvedToPerform": true,
        "approvedDate": "2014-12-23",
        "signUpDate": "2014-09-25",
        "approvedBy": "Mark Ackerly"
    },
    {
        "_id": "55366eafe1a7a72f88e157bb",
        "performerName": "Calcula",
        "address1": "2447 Hendrix Street",
        "address2": "Suite 837",
        "city": "Cascades",
        "state": "Illinois",
        "zipcode": 32043,
        "phone": "(827) 536-2211",
        "website": "www.pariatur.com",
        "references": [
            "labore magna do",
            "et quis eu",
            "consequat aute veniam",
            "ea qui deserunt",
            "esse velit adipisicing",
            "labore cupidatat ullamco",
            "pariatur eiusmod tempor"
        ],
        "instruments": [
            "nisi",
            "enim",
            "ullamco",
            "sint",
            "aliqua",
            "nostrud",
            "duis"
        ],
        "approvedToPerform": true,
        "approvedDate": "2014-08-28",
        "signUpDate": "2014-03-09",
        "approvedBy": "Mark Ackerly"
    },
    {
        "_id": "55366eaf3aad7d2554dee5f9",
        "performerName": "Ovium",
        "address1": "2165 Roebling Street",
        "address2": "Suite 881",
        "city": "Calverton",
        "state": "Michigan",
        "zipcode": 43661,
        "phone": "(927) 582-2933",
        "website": "www.officia.com",
        "references": [
            "nulla cupidatat deserunt",
            "nulla laborum qui",
            "nostrud reprehenderit consectetur",
            "ullamco nostrud adipisicing",
            "minim incididunt cillum",
            "do duis adipisicing",
            "labore sit nisi"
        ],
        "instruments": [
            "cupidatat",
            "culpa",
            "enim",
            "eu",
            "consectetur",
            "sunt",
            "in"
        ],
        "approvedToPerform": false,
        "approvedDate": "2014-04-26",
        "signUpDate": "2014-07-02",
        "approvedBy": "Mark Ackerly"
    },
    {
        "_id": "55366eaf8882ada5d676b9ce",
        "performerName": "Concility",
        "address1": "1755 Barwell Terrace",
        "address2": "Suite 193",
        "city": "Delwood",
        "state": "Nebraska",
        "zipcode": 37984,
        "phone": "(814) 524-2747",
        "website": "www.est.com",
        "references": [
            "sit dolore id",
            "veniam cillum aliquip",
            "dolore fugiat nisi",
            "ad ut id",
            "cillum minim quis",
            "ea nostrud aliquip",
            "in duis mollit"
        ],
        "instruments": [
            "reprehenderit",
            "voluptate",
            "in",
            "aliqua",
            "id",
            "ipsum",
            "cillum"
        ],
        "approvedToPerform": false,
        "approvedDate": "2014-04-27",
        "signUpDate": "2014-04-14",
        "approvedBy": "Mark Ackerly"
    },
    {
        "_id": "55366eaf88a4c1c6dddc9137",
        "performerName": "Kineticut",
        "address1": "5058 Newel Street",
        "address2": "Suite 385",
        "city": "Jennings",
        "state": "Guam",
        "zipcode": 24046,
        "phone": "(996) 474-3948",
        "website": "www.sit.com",
        "references": [
            "nisi voluptate id",
            "amet est voluptate",
            "exercitation sint cupidatat",
            "tempor qui dolor",
            "duis ullamco adipisicing",
            "esse ad labore",
            "est nostrud ullamco"
        ],
        "instruments": [
            "minim",
            "reprehenderit",
            "deserunt",
            "sit",
            "nostrud",
            "duis",
            "magna"
        ],
        "approvedToPerform": false,
        "approvedDate": "2015-03-26",
        "signUpDate": "2014-07-21",
        "approvedBy": "Mark Ackerly"
    },
    {
        "_id": "55366eaf2420df0b73540004",
        "performerName": "Hyplex",
        "address1": "2744 Norwood Avenue",
        "address2": "Suite 441",
        "city": "Deltaville",
        "state": "Delaware",
        "zipcode": 33837,
        "phone": "(860) 418-2598",
        "website": "www.fugiat.com",
        "references": [
            "non nostrud sit",
            "aliqua adipisicing velit",
            "eu amet laboris",
            "adipisicing qui consequat",
            "labore reprehenderit veniam",
            "velit deserunt in",
            "voluptate laborum Lorem"
        ],
        "instruments": [
            "non",
            "ex",
            "Lorem",
            "et",
            "aute",
            "aute",
            "velit"
        ],
        "approvedToPerform": false,
        "approvedDate": "2014-09-11",
        "signUpDate": "2014-09-09",
        "approvedBy": "Mark Ackerly"
    },
    {
        "_id": "55366eaf9c28e97638993ab5",
        "performerName": "Xinware",
        "address1": "5736 Chester Avenue",
        "address2": "Suite 193",
        "city": "Esmont",
        "state": "American Samoa",
        "zipcode": 22230,
        "phone": "(987) 436-2617",
        "website": "www.dolore.com",
        "references": [
            "quis consectetur amet",
            "anim eiusmod reprehenderit",
            "dolor occaecat ex",
            "deserunt eu minim",
            "velit pariatur incididunt",
            "proident aute eiusmod",
            "ullamco cupidatat nulla"
        ],
        "instruments": [
            "nulla",
            "velit",
            "quis",
            "cillum",
            "tempor",
            "id",
            "dolore"
        ],
        "approvedToPerform": true,
        "approvedDate": "2014-10-09",
        "signUpDate": "2014-07-21",
        "approvedBy": "Mark Ackerly"
    },
    {
        "_id": "55366eafa08796477134c731",
        "performerName": "Uncorp",
        "address1": "1590 Glenmore Avenue",
        "address2": "Suite 558",
        "city": "Umapine",
        "state": "Alabama",
        "zipcode": 67565,
        "phone": "(838) 524-2632",
        "website": "www.aliquip.com",
        "references": [
            "duis fugiat mollit",
            "Lorem proident ut",
            "nulla fugiat aliqua",
            "fugiat cupidatat non",
            "culpa nulla pariatur",
            "cillum voluptate et",
            "id officia consequat"
        ],
        "instruments": [
            "aliqua",
            "amet",
            "amet",
            "pariatur",
            "nostrud",
            "sunt",
            "Lorem"
        ],
        "approvedToPerform": false,
        "approvedDate": "2015-02-10",
        "signUpDate": "2014-03-13",
        "approvedBy": "Mark Ackerly"
    },
    {
        "_id": "55366eaf8bc50d5078c67b29",
        "performerName": "Softmicro",
        "address1": "8901 Love Lane",
        "address2": "Suite 504",
        "city": "Konterra",
        "state": "Nevada",
        "zipcode": 91693,
        "phone": "(992) 423-2029",
        "website": "www.Lorem.com",
        "references": [
            "exercitation tempor voluptate",
            "sit mollit laborum",
            "nisi culpa duis",
            "enim mollit dolor",
            "sint dolor voluptate",
            "esse consequat esse",
            "magna magna nisi"
        ],
        "instruments": [
            "proident",
            "nulla",
            "fugiat",
            "fugiat",
            "aliqua",
            "Lorem",
            "non"
        ],
        "approvedToPerform": true,
        "approvedDate": "2015-02-27",
        "signUpDate": "2015-04-12",
        "approvedBy": "Mark Ackerly"
    },
    {
        "_id": "55366eaf83c7835550f9577d",
        "performerName": "Pathways",
        "address1": "9751 Moore Street",
        "address2": "Suite 323",
        "city": "Cleary",
        "state": "Oklahoma",
        "zipcode": 51542,
        "phone": "(866) 559-3679",
        "website": "www.irure.com",
        "references": [
            "minim Lorem tempor",
            "aute quis consequat",
            "pariatur tempor Lorem",
            "consectetur velit consequat",
            "proident nisi adipisicing",
            "officia nostrud tempor",
            "in Lorem exercitation"
        ],
        "instruments": [
            "enim",
            "commodo",
            "ipsum",
            "pariatur",
            "ea",
            "quis",
            "amet"
        ],
        "approvedToPerform": true,
        "approvedDate": "2015-01-25",
        "signUpDate": "2014-09-30",
        "approvedBy": "Mark Ackerly"
    },
    {
        "_id": "55366eaf8204a8212931be47",
        "performerName": "Straloy",
        "address1": "5437 Schenck Court",
        "address2": "Suite 780",
        "city": "Berlin",
        "state": "Pennsylvania",
        "zipcode": 52350,
        "phone": "(852) 476-2229",
        "website": "www.fugiat.com",
        "references": [
            "officia et aliquip",
            "cillum qui aliquip",
            "culpa cupidatat anim",
            "pariatur minim quis",
            "aliqua enim irure",
            "laborum ut sunt",
            "nisi dolor est"
        ],
        "instruments": [
            "sunt",
            "occaecat",
            "consectetur",
            "sit",
            "aliqua",
            "pariatur",
            "quis"
        ],
        "approvedToPerform": false,
        "approvedDate": "2014-05-10",
        "signUpDate": "2014-06-21",
        "approvedBy": "Mark Ackerly"
    },
    {
        "_id": "55366eaf14d1b7c94c100d3e",
        "performerName": "Qualitex",
        "address1": "8743 Newkirk Avenue",
        "address2": "Suite 192",
        "city": "Edgewater",
        "state": "Virgin Islands",
        "zipcode": 35925,
        "phone": "(934) 440-3511",
        "website": "www.ex.com",
        "references": [
            "proident nisi Lorem",
            "veniam enim adipisicing",
            "mollit reprehenderit velit",
            "consectetur dolore cillum",
            "sunt minim elit",
            "commodo ad consequat",
            "anim occaecat est"
        ],
        "instruments": [
            "tempor",
            "ad",
            "enim",
            "culpa",
            "culpa",
            "proident",
            "labore"
        ],
        "approvedToPerform": false,
        "approvedDate": "2014-04-08",
        "signUpDate": "2014-11-13",
        "approvedBy": "Mark Ackerly"
    },
    {
        "_id": "55366eaff3c596189bd63b6c",
        "performerName": "Zytrek",
        "address1": "3519 Polar Street",
        "address2": "Suite 717",
        "city": "Gardiner",
        "state": "Utah",
        "zipcode": 24658,
        "phone": "(904) 497-3043",
        "website": "www.deserunt.com",
        "references": [
            "laborum qui pariatur",
            "exercitation consectetur voluptate",
            "id ea et",
            "ipsum ullamco veniam",
            "anim veniam tempor",
            "non voluptate proident",
            "minim ut ipsum"
        ],
        "instruments": [
            "nulla",
            "proident",
            "voluptate",
            "cupidatat",
            "eu",
            "veniam",
            "cupidatat"
        ],
        "approvedToPerform": true,
        "approvedDate": "2014-10-31",
        "signUpDate": "2014-08-30",
        "approvedBy": "Mark Ackerly"
    },
    {
        "_id": "55366eaf4d017d898c72a2eb",
        "performerName": "Quizmo",
        "address1": "6227 Oceanic Avenue",
        "address2": "Suite 853",
        "city": "Callaghan",
        "state": "Massachusetts",
        "zipcode": 91968,
        "phone": "(821) 501-3851",
        "website": "www.occaecat.com",
        "references": [
            "minim ad consectetur",
            "ad eiusmod fugiat",
            "consectetur id nisi",
            "magna mollit esse",
            "ipsum veniam commodo",
            "culpa mollit Lorem",
            "irure incididunt est"
        ],
        "instruments": [
            "est",
            "mollit",
            "et",
            "do",
            "duis",
            "irure",
            "consectetur"
        ],
        "approvedToPerform": false,
        "approvedDate": "2014-07-20",
        "signUpDate": "2014-11-26",
        "approvedBy": "Mark Ackerly"
    }
];

React.render(<MusicianTable musicians={MUSICIANS} />, document.getElementById("codepenApp"));

