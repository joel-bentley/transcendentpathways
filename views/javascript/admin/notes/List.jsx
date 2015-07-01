var React = require('react');
var moment = require('moment');

var List = React.createClass({
    render: function(){
        var listItems = this.props.items.map(function(item, index){
            return(

                <div className="list-group-item" key={item._id}>
                    <div className="row">
                        <div className="col-sm-10">
                            <strong>{moment.utc(item.noteDate).format('dddd MMMM D, YYYY')}</strong>
                        </div>
                        <div className="col-sm-2">
                            <button
                                className={this.props.approved ?
                                    "btn btn-default btn-sm" : "btn btn-primary btn-sm"}
                                type="button"
                                onClick={this.props.remove.bind(null, index)}>
                                <span className="glyphicon glyphicon-trash"></span>
                            </button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-8 col-sm-offset-1">
                            {item.noteText}
                        </div>
                    </div>
                </div>
            )
        }.bind(this));
        return (
            <div>
                {listItems}
            </div>
        )
    }
});

module.exports = List;