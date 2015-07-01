var React = require('react');


var CancelEvent = React.createClass({
    getDefaultProps: function() {
        return {
            postRoute: '/admin/updateEventDetails'
        }
    },

    saveAndContinue: function(){
        var event = this.props.event;
        event.status.canceled=true;
        event.status.open=false;
        event.status.completed=true;
        $.ajaxSetup({
            headers: {
                'X-CSRF-Token': this.getCSRFTokenValue()
            }
        });
        $.post(this.props.postRoute, event, function(result){
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
            <div className="row">
                <div className="col-sm-9 col-sm-offset-1">
                    Deleting this event will permanently remove it from the database!
                </div>
                <div className="col-sm-2">
                    <button className="btn btn-sm btn-info"
                        onClick={this.saveAndContinue}>Cancel Event!
                    </button>
                </div>
            </div>
        )
    }
});

module.exports = CancelEvent;
