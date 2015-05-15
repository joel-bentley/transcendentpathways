var React = require('react/addons');

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
            this.props.musician.performerName :<span style={{color: 'blue'}}>
                <h5>{this.props.musician.performerName}</h5>
            </span>;
        return (
            <a href="#" className="list-group-item" key={this.props.musician._id}
               onClick={this.changeState}><h5> {name}</h5> </a>
        );
    }
});

module.exports = MusicianRow;