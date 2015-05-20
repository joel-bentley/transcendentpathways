var React = require('react');


var PaymentStatus = React.createClass({
    getDefaultProps: function() {
        return {
            postRoute: '/admin/updateEventDetails',
        }
    },
    componentDidMount:function()
    {
        $(React.findDOMNode(this.refs.paidDate)).pickadate();
    },

    saveAndContinue: function(){
        debugger;
        var event = this.props.event;
        event.payment.status = 'PAID';
        event.payment.paidDate = React.findDOMNode(this.refs.paidDate).value;
        event.payment.reference = React.findDOMNode(this.refs.paymentReference).value;
        event.status.completed=true;
        //console.log(event);
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
                        <label className="col-sm-5 control-label"><h5>Payment Status</h5></label>
                        <div className="col-sm-6">
                            <input className="form-control" type="text"  ref="paymentStatus"
                                   defaultValue={this.props.event.payment.status}
                                   key={this.props.event.payment.status} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-5 control-label"><h5>Paid Date</h5></label>
                        <div className="col-sm-6">
                            <input type="text" className="form-control" ref="paidDate"
                                   placeholder='...'
                                   defaultValue={this.props.event.payment.paidDate}
                                   key={this.props.event.payment.paidDate} />
                        </div>
                    </div>
                    <div className ="form-group">
                        <label className="col-sm-5 control-label"><h5>Reference Number (check number)</h5></label>
                        <div className="col-sm-6">
                            <input type="text" className="form-control" ref="paymentReference"
                                   defaultValue={this.props.event.payment.reference}
                                   key={this.props.event.payment.reference} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-2 col-sm-offset-9">
                            <div>
                                <button className="btn btn-primary" onClick={this.saveAndContinue}>Submit</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
});      //input.form-control.starttimepicker(type='text', name='startTime', id='startTime', placeholder='...')

module.exports = PaymentStatus;
