var React = require('react');

var List = React.createClass({
    render: function(){
        var styles = {
            uList: {
                paddingLeft: 0,
                listStyleType: "none"
            },
            todoItemDate: {
                cursor: "pointer",
                float: "right",
                fontSize: 14

            }
        };
        var listItems = this.props.items.map(function(item, index){
            return(
                <li className = "panel panel-default"  key={this.props.name+index+item.noteText}>
                    <div className="panel-heading">
                        <div>
                            {new Date(item.noteDate).toDateString()}
                            <span
                                style={styles.todoItemDate}
                                onClick = {this.props.remove.bind(null, index)}
                                className="label label-primary">Delete</span>
                        </div>
                    </div>
                    <div className="panel-body">

                        <span>
                            {item.noteText}
                        </span>
                    </div>
                </li>
            )
        }.bind(this));
        return (
            <ul style = {styles.uList}>
                {listItems}
            </ul>
        )
    }
});

module.exports = List;