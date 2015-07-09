var React = require('react');
var moment = require('moment');

var List = React.createClass({
    render: function(){
        var listItems = this.props.items.map(function(item, index){
            return(
                <div className="container-fluid " key={item.noteDate}>
                    <div className=" adminNotes" >
                        <div className="row ">
                            <div className="col-sm-11">
                                <strong><em>{moment.utc(item.noteDate).format('dddd MMMM D, YYYY')}</em></strong>
                            </div>
                            <div className="col-sm-1 buttonRow">
                                <button
                                    className="btn btn-default btn-sm"
                                    type="button"
                                    onClick={this.props.remove.bind(null, index)}>
                                    <span className="glyphicon glyphicon-trash"></span>
                                </button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-9 col-sm-offset-1">
                                {item.noteText}
                            </div>
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