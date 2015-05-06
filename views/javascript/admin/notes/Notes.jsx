var React = require('react');
var ListContainer = require('./ListContainer.jsx');

var Notes = React.createClass({
    render: function(){
        return (
            <div className="Notes">
                <div className="row">
                    <ListContainer name={this.props.name} getNotes={this.props.getNotes} setNotes={this.props.setNotes}/>
                </div>
            </div>
        )
    }
});


module.exports = Notes;

