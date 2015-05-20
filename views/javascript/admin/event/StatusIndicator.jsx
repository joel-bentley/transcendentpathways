var React = require('react');

var StatusIndicator = React.createClass ({
    propTypes: {
        statusText: React.PropTypes.string.isRequired,
        status: React.PropTypes.bool.isRequired
    },

    render: function () {
        return (
            <div>
            <span>
                <h5>
                    {this.props.statusText}
                    <br/>
                    {this.props.status ?
                        <span className="glyphicon glyphicon-ok" style={{color: 'green'}}></span>
                        : null
                    }
                </h5>
            </span>
            </div>
        );
    }
});

module.exports = StatusIndicator;