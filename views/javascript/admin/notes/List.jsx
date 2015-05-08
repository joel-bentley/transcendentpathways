var React = require('react');

var List = React.createClass({
    render: function(){
        var styles = {
            uList: {
                paddingLeft: 0,
                listStyleType: "none"
            },
            listGroup: {
                margin: '5px 5px',
                borderRadius: 10
            },
            removeItem: {
                fontSize: 20,
                float: "left",
                position: "absolute",
                top: 12,
                left: 6,
                cursor: "pointer",
                color: "rgb(0, 0, 255)"
            },
            todoItem: {
                paddingLeft: 20,
                fontSize: 14
            },
            todoItemDate: {
                paddingLeft: 20,
                float: "right",
                fontSize: 12
            }
        };
        var timeDate = new Date();
        var listItems = this.props.items.map(function(item, index){
            return(
                <li className = "list-group-item" style = {styles.listGroup} key={this.props.name+item}>
                        <span
                        className = "glyphicon glyphicon-remove"
                        style = {styles.removeItem}
                        onClick =  {this.props.remove.bind(null, index)}>
                        </span>
                    <div >
                        <span style = {styles.todoItem}>
                            {item}
                        </span>
                    </div>
                    <div >
                        <span style = {styles.todoItemDate}>
                            {timeDate.toDateString()}
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