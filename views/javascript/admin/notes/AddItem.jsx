var React = require('react');

var AddItem = React.createClass({
    getInitialState: function(){
        return {
            newItem: ''
        }
    },
    handleChange: function(e){
        this.setState({
            newItem: e.target.value
        })
    },
    handleSubmit: function(e){
        if(e.keyCode===13){
            var newItemObj = {
                noteDate: new Date(),
                noteText: this.state.newItem
            };
            this.props.add(newItemObj);
            this.setState({
                newItem: ''
            });
        }
    },
    render: function(){
        return(
            <div className="col-sm-12">
                <input type="text"
                       value = {this.state.newItem}
                       placeholder = "New Note"
                       onKeyDown = {this.handleSubmit}
                       onChange = {this.handleChange} />
            </div>
        )
    }
});

module.exports = AddItem;
