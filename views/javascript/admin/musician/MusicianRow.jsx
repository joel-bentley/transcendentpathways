var React = require('react');

var MusicianRow = React.createClass({
    propTypes: {
        musician: React.PropTypes.any.isRequired,
        showDetails: React.PropTypes.func.isRequired
    },
    changeState: function(){
        var musician=this.props.musician;
        this.props.showDetails(musician);
        var bodyRect = document.body.getBoundingClientRect(),
            elemRect = this.getDOMNode().getBoundingClientRect(),
            offset   = elemRect.top - bodyRect.top;
        this.props.renderOffset(offset);
    },
    render: function() {
        var phone = this.props.musician.phone;
        var formattedPhone = '('+phone.substr(0, 3) + ')' + ' ' + phone.substr(3, 3) + '-' + phone.substr(6,4);
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-heading ">
                        <div className="row">
                            <div className="col-sm-9">
                                {this.props.musician.performerName}
                            </div>
                            <div className="col-sm-3">
                                <div
                                    className={this.props.musician.approved ?
                                                "btn btn-default btn-sm" : "btn btn-primary btn-sm"}
                                    type="button"
                                    onClick={this.changeState}>
                                    <span className="glyphicon glyphicon-list"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="panel-body">
                        <div className="container-fluid">
                            <div className="row">
                                Musician Contact:
                            </div>
                            <div className="row">
                                {this.props.musician.contactName}
                            </div>
                            <div className="row">
                                {formattedPhone}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = MusicianRow;