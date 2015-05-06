var React = require('react');
var AddItem = require('./AddItem.jsx');
var List = require('./List.jsx');


var ListContainer = React.createClass({
    getInitialState: function(){

        return {
            list: [],
            name: ''
        }
    },
    handleAddItem: function(newItem){
        this.setState({
            list: this.state.list.concat([newItem])
        });

        this.props.setNotes(this.state.list.concat([newItem]));
        console.log('saving to notes: ' + this.state.list);
    },
    handleRemoveItem: function(index){
        var newList = this.state.list;
        newList.splice(index,1);
        this.setState({
            list: newList
        });
    },
    componentDidMount: function() {                                 //csh loading the facilities into this.state.facilities
        this.setState({
            list: this.props.getNotes(),
            name: this.props.name
        })
    },
    componentWillUpdate: function() {
        if (this.state.name !== this.props.name){
            this.componentDidMount();
        }
    },
    render: function(){

        return (
            <div className="col-sm-12">
                <div className="col-sm-12">
                    <h5 className="text-center"> Notes for {this.props.name}</h5>
                    <AddItem add={this.handleAddItem}/>
                    <List items={this.state.list} remove={this.handleRemoveItem}/>
                </div>
            </div>
        )
    }
});

module.exports = ListContainer;