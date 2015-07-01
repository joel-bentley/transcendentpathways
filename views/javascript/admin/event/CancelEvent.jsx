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
            <div>
                <form className="form-horizontal">
                    <div className="form-group">
                        <div className="col-sm-5">
                            <h5>Deleting this event will permanently remove it from the database!</h5>
                        </div>
                        <div className="col-sm-1">
                            <div>
                                <button className="btn btn-sm btn-danger"
                                    onClick={this.saveAndContinue}>CANCEL EVENT!
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
});      //input.form-control.starttimepicker(type='text', name='startTime', id='startTime', placeholder='...')

module.exports = CancelEvent;
