var React = require('react');

var Alert = React.createClass({
    render: function(){
        return(
            <div className="col-sm-10 col-sm-offset-1">
                <div className="row" style={{
                         "color": "#FFFFFF",
                         "backgroundColor": "#6C9FE2",
                         "padding": "20px",
                         "border-radius": "5px",
                         "border": "3px solid rebeccapurple"
                     }}>
                    <div className="col-sm-10">{this.props.message}</div>
                    <div className="col-sm-2">
                        <button
                            className="btn btn-xs btn-default"
                            onClick={this.props.dismiss}
                            type='submit'>
                            <span className="glyphicon glyphicon-remove"> </span>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = Alert;