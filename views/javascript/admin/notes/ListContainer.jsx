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
            <div className="panel panel-default slideTransition" >
                <div className="panel-heading">
                    <div className="panel-title">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-xs-8">
                                    <span style={{color: 'blue'}}>
                                        <h5>Notes</h5>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="panel-body">
                    <div className="container-fluid">
                        <div>

                            <AddItem
                                add={this.handleAddItem}
                            />
                            <br/>
                            <List
                                items={this.props.getNotes()}
                                remove={this.handleRemoveItem}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = ListContainer;