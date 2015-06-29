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

        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xs-9">
                                <h5>{this.props.musician.performerName}</h5>
                            </div>
                            <div className="col-xs-3">
                                <button
                                    className={this.props.musician.approved ?
                                                "btn btn-default btn-sm" : "btn btn-primary btn-sm"}
                                    type="button"
                                    onClick={this.changeState}>
                                    <span className="glyphicon glyphicon-list"></span>
                                </button>
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
                            {this.props.musician.phone}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = MusicianRow;