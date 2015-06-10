var React = require('react');

module.exports = React.createClass({
    render: function() {
        return (
            <a href="#" className="list-group-item">
                <h4 className="list-group-item-heading">
                    <span className="listing-position-name">Facility Name: { this.props.facilityName }</span>
                </h4>
                <p className="list-group-item-text">
                    <span>Date: { this.props.date }</span>
                </p>
                <p className="list-group-item-text">
                    <span>Start Time: { this.props.start }</span>
                </p>
                <p className="list-group-item-text">
                    <span>End Time: { this.props.end }</span>
                </p>
                <p className="list-group-item-text">
                    <span>Details: { this.props.details }</span>
                </p>
            </a>
        );
    }
});
