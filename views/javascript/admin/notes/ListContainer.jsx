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
            <div className="col-sm-12">
                <div className="col-sm-12 Notes">
                    <h5 className="text-center"> Notes for {this.props.name}</h5>
                    <AddItem
                        add={this.handleAddItem}
                    />
                    <List
                        items={this.props.getNotes()}
                        remove={this.handleRemoveItem}
                    />
                </div>
            </div>
        )
    }
});

module.exports = ListContainer;