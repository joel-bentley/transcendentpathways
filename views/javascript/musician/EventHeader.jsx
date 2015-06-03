var React = require('react');

var EventHeader = React.createClass({

    render: function(){
        return(
            <row className="form-group">
                <div className="col-sm-2">
                    <h5>Event Date</h5>
                </div>
                <div className="col-sm-4">
                    <h5>Facility Name</h5>
                </div>
                <div className="col-sm-2">
                    <h5>Start Time</h5>
                </div>
                <div className="col-sm-2">
                    <h5>End Time</h5>
                </div>
                <div className="col-sm-2">
                    <h5>Zip Code</h5>
                </div>
            </row>
        )
    }
});

module.exports = EventHeader;