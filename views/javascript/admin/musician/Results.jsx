
var React = require('react');
var Griddle = require('griddle-react');


var Results = React.createClass({
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
        return(
                <Griddle results={this.state.list} tableClassName="table" showFilter={true}
                     showSettings={true} columns={["performerName", "contactName", "approvedToPerform", "phone"]}/>
        )
    }
    //    var rows = this.state.list.map(function(record) {
    //        return (
    //            <tr key={record._id}>
    //                <td>
    //                    <a className="btn btn-default btn-sm" to="musician" params={{musicianID: record._id}}>Edit</a>
    //                </td>
    //                <td>{record.performerName}</td>
    //                <td>{record.contactName}</td>
    //                <td>{record.approvedToPerform}</td>
    //                <td>{record._id}</td>
    //            </tr>
    //
    //        );
    //    });
    //    return (
    //        <div id="app1" className="table-responsive">
    //            <table className="table table-striped table-results">
    //                <thead>
    //                <tr >
    //                    <th></th>
    //                    <th>performer name</th>
    //                    <th  className="stretch">contact name</th>
    //                    <th>approved</th>
    //                    <th>id</th>
    //                </tr>
    //                </thead>
    //                <tbody>
    //                {rows}
    //                </tbody>
    //            </table>
    //        </div>
    //    );
    //}
});

module.exports=Results;
