var React = require('react/addons');
var ReactRouter = require('react-router');


var LinkedState = React.addons.LinkedStateMixin;
var Link = ReactRouter.Link;


var Component = React.createClass({
    mixins: [ LinkedState ],
    getDefaultProps: function () {

        return {
            data: []
        };
    },
    render: function () {

        var rows = this.props.data.map(function (record) {

            return (
                <tr key={record._id}>
                    <td>
                        <Link
                            className="btn btn-info btn-sm"
                            to="musicianDetails"
                            params={{ id: record._id }}>

                            Edit
                        </Link>
                    </td>
                    <td className="nowrap">{record.performerName}</td>
                    <td>{record.contactName}</td>
                    <td>{record.zipcode}</td>
                    <td>{record.website}</td>
{/*                 <td className="nowrap">{record._id}</td>          */}
                </tr>
            );
        });

        return (
            <div className="table-responsive">
                <table className="table table-striped table-results success">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Group/Performer</th>
                            <th>Contact Person</th>
                            <th>Zip Code</th>
                            <th>Website</th>
{/*                         <th>id</th>           */}
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


module.exports = Component;
