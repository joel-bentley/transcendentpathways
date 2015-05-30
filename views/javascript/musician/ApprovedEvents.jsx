var React = require('react');

var ApprovedEvents = React.createClass ({

    render: function(){

        return(
            <div>
                Approved Events
                <h5>{this.props.approvedEvents}</h5>
            </div>
        );
    }
});

module.exports = ApprovedEvents;