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
            musician: null,
            offset: 0,
            showNotes: false
        }
    },
    showNotes: function(){
        this.setState({
            showNotes: !this.state.showNotes
        })
    },
    showDetails: function(musician){
        this.setState({
            showResults: true,
            musician: musician
        });
    },
    renderOffset: function(offset){
        this.setState({
            offset: offset
        })
    },
    saveValues: function(fields) {
        var x = this.state.musician;
        x._id = fields._id;
        //x.performerName = fields.performerName;
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
            if (this.isMounted()) {
                this.setState({
                    musicians: result
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
                        renderOffset = {this.renderOffset}
                        />
                );
            } else {
                rowsNotApproved.push(
                    <MusicianRow
                        musician = {musician}
                        key= {musician.performerName}
                        showDetails={this.showDetails}
                        renderOffset = {this.renderOffset}
                        />
                );
            }
        }.bind(this));

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-4">
                        <h4>New Musicians</h4>
                        {rowsNotApproved}
                        <h4>Existing Musicians</h4>
                        {rowsApproved}
                    </div>
                    <div className="col-sm-8">
                        {this.state.showResults && !this.state.showNotes ?
                            <DetailsBar
                                offset = {this.state.offset}
                                musician={this.state.musician}
                                handleChangedData={this.handleChangedData}
                                saveValues={this.saveValues}
                                showNotes={this.showNotes}
                                notes={this.state.showNotes}
                        />: null }
                    </div>
                    <div className="col-sm-8">
                        {this.state.showNotes ?
                            <ListContainer
                                offset = {this.state.offset}
                                name = {this.state.musician.performerName}
                                approved = {this.state.musician.approved}
                                getNotes={this.getNotes}
                                setNotes={this.setNotes}
                                showNotes={this.showNotes}
                        /> : null}
                    </div>
                </div>
            </div>
        );
    }
});



React.render(<MusicianTable />, document.getElementById("musicianAdmin"));