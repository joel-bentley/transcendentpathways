var React = require('react/addons');
var MusicianRow = require('./MusicianRow.jsx');
var DetailsBar = require('./DetailsBar.jsx');
var ListContainer = require('../notes/ListContainer.jsx');

var MusicianTable = React.createClass({
    getDefaultProps: function(){
        return {
            source: '/musicianData',
            postRoute: '/admin/updateMusicianDetails'
        }
    },
    getInitialState: function(){
        return {
            musicians: [],
            showResults: false,
            musician: null
        }
    },
    showDetails: function(musician){
        this.setState({
            showResults: true,
            musician: musician
        });
    },
    saveValues: function(fields) {
        var x = this.state.musician;
        x._id = fields._id;
        x.performerName = fields.performerName;
        x.contactName = fields.contactName;
        x.phone = fields.phone;
        x.address1 = fields.address1;
        x.address2 = fields.address2;
        x.city = fields.city;
        x.state = fields.state;
        x.zipcode = fields.zipcode;
        x.website = fields.website;
        x.biography = fields.biography;
        x.instruments = fields.instruments;
        x.picture = fields.picture;
        x.approvedDate = fields.approvedDate;
        x.approvedBy = fields.approvedBy;
        x.signUpDate = fields.signUpDate;
        x.approved = fields.approved;

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
    handleChangedData: function(musician){
        var x = this.state.musicians;
        x.forEach(function(elem,index){
            if (elem._id===musician._id){
                x[index] = musician;
            }
        }.bind(this));
        this.setState({
            musicians: x,
            musician: musician,
            showResults: false
        });
        $.ajaxSetup({
            headers: {
                'X-CSRF-Token': this.getCSRFTokenValue()
            }
        });
        $.post(this.props.postRoute, musician, function(result){
            //console.log(result);
        });

    },
    componentDidMount: function() {                                 //csh loading the musician into this.state.musician
        $.get(this.props.source, function(result) {
            var musicianData = result;
            if (this.isMounted()) {
                this.setState({
                    musicians: musicianData
                });
            }
        }.bind(this));
    },
    getNotes: function(){
        return this.state.musician.notes;
    },
    setNotes: function(notes) {
        var x = this.state.musician;
        x.notes = notes;
        this.setState({
            musician: x
        });
    },
    render: function() {
        var rowsApproved = [];
        var rowsNotApproved = [];
        this.state.musicians.forEach(function(musician) {
            if (musician.approved != false){
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
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-2 list-group">
                        <a href="#" className="list-group-item active"> <h5>Performer List</h5></a>
                        {rowsNotApproved} {rowsApproved}
                    </div>
                    <div className="col-sm-7">
                        {this.state.showResults ? <DetailsBar
                            musician={this.state.musician}
                            handleChangedData={this.handleChangedData}
                            saveValues={this.saveValues}
                        />: null }
                    </div>
                    <div className="col-sm-3">
                        {this.state.showResults ?
                            <ListContainer
                                name = {this.state.musician.performerName}
                                getNotes={this.getNotes}
                                setNotes={this.setNotes}
                            /> : null}
                    </div>
                </div>
            </div>
        );
    }
});



React.render(<MusicianTable />, document.getElementById("musicianAdmin"));