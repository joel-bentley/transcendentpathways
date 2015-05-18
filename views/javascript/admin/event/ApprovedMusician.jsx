var React = require('react');

var ApprovedMusician = React.createClass({
    getDefaultProps: function() {
        return {
            postRoute: '/admin/updateEventDetails',
            }
    },
    updateEvent: function(){
        this.props.enableSave(false);
        var updatedEvent = this.props.event;
            updatedEvent.status.approved = true;
            updatedEvent.status.requested = true;
            $.ajaxSetup({
                headers: {
                    'X-CSRF-Token': this.getCSRFTokenValue()
                }
            });
            $.post(this.props.postRoute, updatedEvent, function(result){
                //console.log(result);
            });
    },
    getCSRFTokenValue: function() {
        var metas = document.getElementsByTagName('meta');

        for (var i=0; i<metas.length; i++) {
            if (metas[i].getAttribute("name") == 'csrf-token') {
                return metas[i].getAttribute('content');
            }
        }
        return '';
    },
    render: function(){
        return(
            <div>
                <div className="container-fixed">
                    <h5>Event Approved For (click note to approve)</h5>
                    {this.props.event.approvedMusician ?
                        <div className="list-group-item"
                             style={
                             {"paddingTop": "0px",
                             "paddingBottom": "0px",
                             "backgroundColor": "#6C9FE2"
                             }}>
                                <h5>{this.props.event.approvedMusician}</h5>
                        </div> :
                        null
                    }
                </div>

                {this.props.allowSave ?
                    <div className="row">
                        <hr></hr>
                        <div className="col-sm-1 col-sm-11-offset">
                            <button
                                className="btn btn-primary"
                                onClick = {this.updateEvent}
                        >Submit</button>
                        </div>
                    </div>:
                    null }

            </div>
        )
    }
});

module.exports  = ApprovedMusician;

