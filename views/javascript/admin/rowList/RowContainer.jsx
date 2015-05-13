var React = require('react');
var Row = require('./Row.jsx');


var RowContainer = React.createClass({
    getInitialState: function(){
        return {
            list: this.props.getRows(),
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
            <div>
                <div>
                    <h5 className="text-center"> Notes for {this.props.name}</h5>
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
        )
    }
});

module.exports = ListContainer;