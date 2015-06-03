var React = require('react');

var SearchEvents = React.createClass ({

    render: function(){

        return(
            <div>
                <h4>Search Events</h4>
                <div>
                    <row>
                        <div className="col-sm-3">
                            <div className="form-group">
                                <h5>Search For</h5>
                                <input type="text" className="form-control" id="searchText" placeholder="Search..."></input>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="form-group">
                                <h5>Sort By</h5>
                                <select className="form-control" defaultValue="A">
                                    <option value="C">Facility</option>
                                    <option value="B">Event Date</option>
                                    <option value="A">Zip Code</option>
                                </select>
                            </div>
                        </div>
                    </row>
                </div>
            </div>
        );
    }
});

module.exports = SearchEvents;