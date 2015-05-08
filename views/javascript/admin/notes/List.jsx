var React = require('react');

var List = React.createClass({
    render: function(){
        var styles = {
            uList: {
                paddingLeft: 0,
                listStyleType: "none"
            },
            listGroup: {
                margin: '10px 10px',
                borderRadius: 5
            },
            removeItem: {
                fontSize: 14,
                float: "left",
                position: "absolute",
                top: 4,
                left: 4,
                cursor: "pointer",
                color: "rgb(255, 0, 0)"
            },
            todoItem: {
                top:2,
                paddingLeft: 20,
                fontSize: 14
            },
            todoItemDate: {
                paddingLeft: 20,
                float: "right",
                fontSize: 14,
                bottom: 5
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

                    <span style = {styles.todoItem}>
                        {item}
                    </span>


                    <span style = {styles.todoItemDate}>
                        {timeDate.toDateString()}
                    </span>

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