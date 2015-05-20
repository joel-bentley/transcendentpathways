var React = require('react');

module.exports = React.createClass({
    render: function() {
        return (
            <a href="#" className="list-group-item" onClick={this.props.handleClick}>
                <h4 className="list-group-item-heading">
                    <span className="listing-position-name">{ this.props.facilityName }</span>
                </h4>
                <p className="list-group-item-text">
                    <span>{ this.props.dateString }</span>
                </p>
                <p className="list-group-item-text">
                    <span>{ this.props.timeString } </span>
                </p>
                <p className="list-group-item-text">
                    <span>Details: { this.props.details }</span>
                </p>
                <p style={{textAlign: 'right'}}>
                    { this.props.requested ? <span className="glyphicon glyphicon-ok" style={{color: 'green'}}>Event Requested</span> : null }
                </p>
            </a>
        );
    }
});
