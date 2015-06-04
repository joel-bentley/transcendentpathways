var React = require('react');

var EventHeader = React.createClass({

    render: function(){
        return(
            <tr>
                <th className="text-center">Event Date</th>
                <th className="text-center">Facility Name</th>
                <th className="text-center">Start Time</th>
                <th className="text-center">End Time</th>
                <th className="text-center">Zip Code</th>
            </tr>
        )
    }
});

module.exports = EventHeader;