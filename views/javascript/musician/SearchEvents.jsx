var React = require('react');

var SearchEvents = React.createClass ({

    render: function(){

        return(
            <div className="bg-warning">
                <div>
                    <h4>Search</h4>
                </div>
                <div className="container-fluid">
                    <form >
                        <div className="col-md-4 ">
                            <label>Search by Zip Code</label>
                            <input type="text" className="form-control" id="searchText" placeholder="Search..."></input>
                        </div>
                        <div className="col-md-4 ">
                            <label>Sort By</label>
                            <select className="form-control" defaultValue="A">
                                <option value="A">Zip Code</option>
                                <option value="B">Event Date</option>
                                <option value="C">Facility</option>
                            </select>
                        </div>
                        <div className="col-md-4 ">
                            <label>Event Limit</label>
                            <select className="form-control" defaultValue="A">
                                <option value="A">10 Events</option>
                                <option value="B">25 Events</option>
                                <option value="C">50 Events</option>
                            </select>
                        </div>
                        <div className="col-md-12">
                            <label> </label>
                        </div>
                        <div className="col-md-12">
                            <label> </label>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
});

module.exports = SearchEvents;