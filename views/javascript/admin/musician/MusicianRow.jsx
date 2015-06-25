var React = require('react');

var MusicianRow = React.createClass({
    propTypes: {
        musician: React.PropTypes.any.isRequired,
        showDetails: React.PropTypes.func.isRequired
    },
    changeState: function(){
        var musician=this.props.musician;
        this.props.showDetails(musician);
    },
    render: function() {
        var name = this.props.musician.approved ?
            this.props.musician.performerName :<span style={{"color": "blue"}}>
                {this.props.musician.performerName}
            </span>;
        return (
            <a href="#" className="list-group-item" key={this.props.musician._id}
               onClick={this.changeState}>{name}</a>
        );
    }
});

module.exports = MusicianRow;