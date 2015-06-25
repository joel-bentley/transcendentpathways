var React = require('react');
var FacilityContact = require('./FacilityContact.jsx');

var moment = require('moment');

var EventCard = React.createClass({
    getInitialState: function(){
        return({
            facility: null,
            complete: false
        });
},

    getDefaultProps: function() {
        return {
            facilitySource: '/getFacilityInfo'
        }
    },

    changeState: function(){
        var event = this.props.event;
        this.props.showDetails(event);
        this.props.enableSave(false);
        var bodyRect = document.body.getBoundingClientRect(),
            elemRect = this.getDOMNode().getBoundingClientRect(),
            offset   = elemRect.top - bodyRect.top;
        this.props.renderOffset(offset);
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
    getFacilityInfo: function(facilityName){
        $.ajaxSetup({
            headers: {
                'X-CSRF-Token': this.getCSRFTokenValue()
            }
        });
        $.post(this.props.facilitySource, facilityName, function(result){
            this.setState({
                facility: result,
                complete: true
            });
        }.bind(this));
    },
    componentDidMount: function(){
        this.getFacilityInfo({'facilityName': this.props.event.facilityName});
    },
    render: function() {

        //var startMoment = moment.utc(this.props.event.start);
        //var endMoment = moment.utc(this.props.event.end).format('h:mm a');

        var startString = moment.utc(this.props.event.start).format('h:mm a');
        var endString = moment.utc(this.props.event.end).format('h:mm a');
        var timeDiffString = moment.utc(this.props.event.end).diff(moment.utc(this.props.event.start), 'minutes');

        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <div className="panel-title">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-xs-10">
                                    <span>
                                        {this.props.event.facilityName}
                                    </span>

                                </div>
                                <div className="col-xs-2">
                                    {this.props.allowSave ?
                                        null :
                                        <button
                                            style={{padding: '2px 10px'}}
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={this.changeState}
                                            >

                                            <span
                                                className="glyphicon glyphicon-list"
                                            ></span>
                                        </button>
                                    }
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-9 col-xs-3-offset">
                                    <span style={{color: 'indigo'}}>
                                        <h5>{moment.utc(this.props.event.start).format('dddd MMMM D, YYYY')}</h5>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="panel-body">
                    <div className="container-fluid">
                        <div className="row">
                            <h5>{startString + '  -  ' + endString + ' (' + timeDiffString + ' minutes)'}</h5>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 col-xs-offset-0">
                                <hr></hr>
                                <h5>{this.props.event.description}</h5>
                            </div>
                        </div>
                        {this.state.complete ? <FacilityContact facility={this.state.facility}/> : null}
                    </div>
                </div>
            </div>
        );
    }

});

module.exports = EventCard;

