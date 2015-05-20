var React = require('react');

var RequestedBy = React.createClass({
    updateMusician: function(musician){
        if (musician !== this.props.event.approvedMusician){
            this.props.enableSave(true);
        }
        var x = this.props.event;
        x.approvedMusician = musician;
        if (x) {
            this.props.updateEvent(x);
        }
    },
    render: function(){
        var musicianList = [];
        this.props.musicians.map(function(elem){
            musicianList.push(
                <li className="list-group-item" key={elem.musicianName}>
                    <div className="row">
                        <div className="col-sm-10   ">
                            {elem.musicianName}
                        </div>
                        {this.props.event.status.completed? null :
                            <div className="col-sm-2">
                                <span
                                    className="glyphicon glyphicon-music"
                                    style={{color:'gray'}}
                                    onClick={this.updateMusician.bind(null, elem.musicianName)}
                                >
                                </span>
                        </div>}
                    </div>
                </li>
            )
        }.bind(this));
        return(
            <div>
                <div className="list-group-item-heading">
                    <h5>Musicians Requesting Approval</h5>
                </div>
                <div>
                    <h5>{musicianList}</h5>
                </div>
            </div>
        );
    }
});

module.exports = RequestedBy;
