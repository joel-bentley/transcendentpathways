
var React = require('react');
//var Router = require('react-router');
//var Route = Router.Route;
//var DefaultRoute = Router.DefaultRoute;
//var NotFoundRoute = Router.NotFoundRoute;
//var RouteHandler = Router.RouteHandler;
//var Link = Router.Link;

var Results = React.createClass({
    //contextTypes: {
    //    router: React.PropTypes.func
    //},
    getInitialState: function(){
        return {
            list: []
        }
    },
    componentDidMount: function() {
        $.get('/musicianData', function(result) {
            if (this.isMounted()) {
                this.setState({
                    list: result
                });
            }
        }.bind(this));
    },
    render: function () {
        var rows = this.state.list.map(function(record) {
            return (
                <tr key={record._id}>
                    <td>
                        <a className="btn btn-default btn-sm" to="musician" params={{musicianID: record._id}}>Edit</a>
                    </td>
                    <td>{record.performerName}</td>
                    <td>{record.contactName}</td>
                    <td>{record.approvedToPerform}</td>
                    <td>{record._id}</td>
                </tr>

            );
        });
        return (
            <div id="app1" className="table-responsive">
                <table className="table table-striped table-results">
                    <thead>
                    <tr >
                        <th></th>
                        <th>performer name</th>
                        <th  className="stretch">contact name</th>
                        <th>approved</th>
                        <th>id</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rows}
                    </tbody>
                </table>
            </div>
        );
    }
});

module.exports=Results;

//var Musician = React.createClass({
//    contextTypes: {
//        router: React.PropTypes.func
//    },
//    render: function (){
//        return <h2>Musician Edit Page</h2>
//    }
//});
//
//var NotFound = React.createClass({
//    contextTypes: {
//        router: React.PropTypes.func
//    },
//    render: function () {
//        return <h2>Not found</h2>;
//    }
//});

//var routes = (
//    <Route name="results" path="/" handler={Results}>
//        <Route name="musician" path="/musician/:musicianID" handler={Musician} />
//        <NotFoundRoute handler={NotFound} />
//    </Route>
//);
//
//Router.run(routes, function (Handler) {
//  React.render(<Handler/>, document.getElementById("app1"));
//});