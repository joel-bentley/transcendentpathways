var React = require('react/addons');
var FacilityRow = require('./FacilityRow.jsx');
var DetailsBar = require('./DetailsBar.jsx');
var ListContainer = require('../notes/ListContainer.jsx');


var FacilityTable = React.createClass({
    getDefaultProps: function(){
        return {
            source: '/homeAdminFacilityData',
            postRoute: '/admin/updateFacilityDetails'
        }
    },
    getInitialState: function(){
        return {
            facilities: [],
            showResults: false,
            facility: null
        }
    },
    showDetails: function(facilityNew){
        this.setState({
            showResults: true,
            facility: facilityNew
        });
    },
    saveValues: function(fields) {
        var x = this.state.facility;
        x._id = fields._id;
        x.facilityName = fields.facilityName;
        x.address1 = fields.address1;
        x.address2 = fields.address2;
        x.city = fields.city;
        x.state = fields.state;
        x.zip = fields.zip;
        x.city = fields.city;
        x.state = fields.state;
        x.zipcode = fields.zipcode;
        x.contactName = fields.contactName;
        x.contactPhone = fields.contactPhone;
        x.contactEmail = fields.contactEmail;
        x.buildingName = fields.buildingName;
        x.locationName = fields.locationName;
        x.roomSize = fields.roomSize;
        x.securityNeeded = fields.securityNeeded;
        x.waiverNeeded = fields.waiverNeeded;
        x.patientNumber = fields.patientNumber;
        x.approved = fields.approved;
        x.approvedDate = fields.approvedDate;
        x.signUpDate = fields.signUpDate;
        x.approvedBy = fields.approvedBy;
        x.notes = fields.notes;

        this.handleChangedData(x);
    },
    getCSRFTokenValue: function() {
        var metas = document.getElementsByTagName('meta');

        for (var i=0; i<metas.length; i++) {
            if (metas[i].getAttribute("name") == 'csrf-token') {
                return metas[i].getAttribute('content');
            }
        }
        return '';
    },
    handleChangedData: function(facility){
        var x = this.state.facilities;
        x.forEach(function(elem,index){
            if (elem._id===facility._id){
                x[index] = facility;
            }
        }.bind(this));
        this.setState({
            facilities: x,
            facility: facility,
            showResults: false
        });
        $.ajaxSetup({
            headers: {
                'X-CSRF-Token': this.getCSRFTokenValue()
            }
        });
        $.post(this.props.postRoute, facility, function(result){
            //console.log(result);
        });
    },
    componentDidMount: function() {                                 //csh loading the facilities into this.state.facilities
        $.get(this.props.source, function(result) {
            var facilityData = result;
            if (this.isMounted()) {
                this.setState({
                    facilities: facilityData
                });
            }
        }.bind(this));
    },
    getNotes: function(){
        return this.state.facility.notes;
    },
    setNotes: function(notes) {
        var x = this.state.facility;
        x.notes = notes;
        this.setState({
            facility: x
        });
    },
    render: function() {
        var rowsApproved = [];
        var rowsNotApproved = [];
        this.state.facilities.forEach(function(facility) {
            if (facility.approved != false){
                rowsApproved.push(
                    <FacilityRow
                        facility = {facility}
                        key = {facility.facilityName}
                        showDetails={this.showDetails}
                        />
                );
            } else {
                rowsNotApproved.push(
                    <FacilityRow
                        facility = {facility}
                        key= {facility.facilityName}
                        showDetails={this.showDetails}
                        />
                );
            }
        }.bind(this));

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-2 list-group">
                        <a href="#" className="list-group-item active"> Facility List</a>
                        {rowsNotApproved} {rowsApproved}
                    </div>
                    <div className="col-sm-7">
                        {this.state.showResults ?
                                <DetailsBar
                                    facility={this.state.facility}
                                    handleChangedData={this.handleChangedData}
                                    saveValues={this.saveValues}
                                />: null }
                    </div>
                    <div className="col-sm-3">
                        {this.state.showResults ?
                            <ListContainer
                                name = {this.state.facility.facilityName}
                                getNotes={this.getNotes}
                                setNotes={this.setNotes}
                            /> : null}
                    </div>
                </div>
            </div>
        );
    }
});



React.render(<FacilityTable />, document.getElementById("facilityAdmin"));