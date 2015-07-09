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
            <div className="panel panel-default notePanel">
                <div className="form-group">
                    <div className="row">
                        <div className="col-sm-12">
                            <h4>Create a New Note</h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-10 col-sm-offset-1">
                            <textarea
                               className="form-control" rows="3"
                               value = {this.state.newItem}
                               placeholder = "Record your comments here."
                               onKeyDown = {this.handleSubmit}
                               onChange = {this.handleChange}>
                            </textarea>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = AddItem;
