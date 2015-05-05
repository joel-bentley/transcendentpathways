var React = require('react/addons');
var MusicianRow = require('./MusicianRow.jsx');
var DetailsBar = require('./DetailsBar.jsx');

//var _ = require('lodash');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var MusicianTable = React.createClass({
    propTypes: {
        //musicians: React.PropTypes.array.isRequired
    },
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
        //save admin changes to the musician here with this.state.musician
        // exports.postUpdateMusicianDetails used in admin.js controller
        // route create in app.js /admin/updateMusicianDetails-->this.state.postRoute
        // jQuery.post( url [, data ] [, success ] [, dataType ] )

        $.ajaxSetup({
            headers: {
                'X-CSRF-Token': this.getCSRFTokenValue()
            }
        });
        $.post(this.props.postRoute, musician, function(result){
            //console.log(result);
        });

    },
    componentDidMount: function() {                                 //csh loading the musicians into this.state.musicians
        $.get(this.props.source, function(result) {
            var musicianData = result;
            if (this.isMounted()) {
                this.setState({
                    musicians: musicianData
                });
            }
        }.bind(this));



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



React.render(<MusicianTable />, document.getElementById("musicianAdmin"));