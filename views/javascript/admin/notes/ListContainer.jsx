var React = require('react');
var AddItem = require('./AddItem.jsx');
var List = require('./List.jsx');


var ListContainer = React.createClass({
    getInitialState: function(){

        return {
            list: this.props.getNotes(),
            name: this.props.name
        }
    },
    componentDidMount: function(){
        this.placeDiv(0,this.props.offset);
    },
    componentDidUpdate: function(){
        this.placeDiv(0,this.props.offset);
    },
    placeDiv: function(x_pos, y_pos) {
        var d = this.getDOMNode();
        d.style.position = "relative";
        d.style.left = x_pos +'px';
        d.style.top = y_pos-121+'px';
    },
    handleAddItem: function(newItem){
        this.setState({
            list: this.state.list.concat([newItem])
        });
        this.props.setNotes(this.props.getNotes().concat([newItem]));
    },
    handleRemoveItem: function(index){
        var newList = this.props.getNotes();
        newList.splice(index,1);
        this.setState({
            list: newList
        });
    },
    render: function(){

        return (
            <div className="col-sm-12 slideTransition">
                <div className="panel" >
                    <div className={this.props.approved ? "panel-heading panel-success": "panel-heading panel-primary"}>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-sm-10">
                                    Notes for {this.props.name}
                                </div>
                                <div className="col-sm-2">
                                    <button
                                        className={this.props.approved ?
                                            "btn btn-primary btn-sm" : "btn btn-default btn-sm"}
                                        type="button"
                                        onClick={this.props.showNotes}>
                                        <span className="glyphicon glyphicon-arrow-left"> Back </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="panel-body">
                        <div >
                            <div>
                                <List
                                    items={this.props.getNotes()}
                                    remove={this.handleRemoveItem}
                                />
                                <hr></hr>
                                <AddItem
                                    add={this.handleAddItem}
                                />
                                <br/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = ListContainer;