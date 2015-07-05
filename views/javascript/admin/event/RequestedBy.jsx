var React = require('react');

var RequestedBy = React.createClass({
    updateMusician: function(musician){
        if (musician !== this.props.event.approvedMusicianName){
            this.props.enableSave(true);
        }
        var x = this.props.event;
        x.approvedMusicianName = musician.musicianName;
        if (x) {
            this.props.updateEvent(x);
        }
    },
    render: function(){
        var musicianList = [];
        this.props.musicians.map(function(elem){
            if(elem) {
                musicianList.push(
                    <li className="list-group-item" key={elem}>
                        <div className="row">
                            <div className="col-sm-10   ">
                                {elem.musicianName}
                            </div>
                            {this.props.event.status.completed ? null :
                                <div className="col-sm-2">
                                    <span
                                        className="glyphicon glyphicon-music"
                                        onClick={this.updateMusician.bind(null, elem)}
                                        >
                                    </span>
                                </div>}
                        </div>
                    </li>
                )
            }
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
