var React = require('react/addons');
var ControlGroup = require('../../components/form/ControlGroup');
var TextControl = require('../../components/form/TextControl');
var Button = require('../../components/form/Button');
var Spinner = require('../../components/form/Spinner');
var Actions = require('./Actions');
var Store = require('./Store');


var Component = React.createClass({
    mixins: [ React.addons.LinkedStateMixin ],
    getInitialState: function () {

        Store.reset();
        return Store.getState();
    },
    componentDidMount: function () {

        Store.addChangeListener(this.onStoreChange);
        this.refs.performerName.refs.inputField.getDOMNode().focus();
    },
    componentWillUnmount: function () {

        Store.removeChangeListener(this.onStoreChange);
    },
    onStoreChange: function () {

        this.setState(Store.getState());
    },
    handleSubmit: function (event) {

        event.preventDefault();
        event.stopPropagation();

        Actions.sendRequest({
            performerName: this.state.performerName
        });
    },
    render: function () {

        var alerts = [];
        if (this.state.success) {
            alerts.push(<div key="success" className="alert alert-success">
                Success. Redirecting...
            </div>);
        }
        else if (this.state.error) {
            alerts.push(<div key="danger" className="alert alert-danger">
                {this.state.error}
            </div>);
        }


        /*<div class="row">
          <div class="col-xs-2">
            <input type="text" class="form-control" placeholder=".col-xs-2">
          </div>
          <div class="col-xs-3">
            <input type="text" class="form-control" placeholder=".col-xs-3">
          </div>
          <div class="col-xs-4">
            <input type="text" class="form-control" placeholder=".col-xs-4">
          </div>
        </div>*/

        var formElements;
        if (!this.state.success) {
            formElements = <fieldset>
                <div className="row">
                    <div className="col-md-4">
                        <TextControl
                            placeholder="performer name"
                            name="performerName"
                            label="Performer Name" class="col-sm-2 control-label"
                            ref="performerName"
                            hasError={this.state.hasError.performerName}
                            valueLink={this.linkState('performerName')}
                            help={this.state.help.performerName}
                            disabled={this.state.loading}
                        />
                    </div>
                    <div className="col-md-4">
                        <TextControl
                            placeholder="first name"
                            label="Contact First Name"
                            ref="contactFirstName"
                            width="15"
                            hasError={this.state.hasError.contactFirstName}
                            valueLink={this.linkState('contactFirstName')}
                            help={this.state.help.contactFirstName}
                            name="contactFirstName"
                            disabled={this.state.loading}
                        />
                    </div>
                    <div className="col-md-4">
                        <TextControl
                            placeholder="last name"
                            name="contactLastName"
                            label="Contact Last Name"
                            ref="contactLastName"
                            hasError={this.state.hasError.contactLastName}
                            valueLink={this.linkState('contactLastName')}
                            help={this.state.help.contactLastName}
                            disabled={this.state.loading}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <TextControl
                            placeholder="address line 1"
                            name="address1"
                            label="Address Line 1"
                            ref="address1"
                            hasError={this.state.hasError.address1}
                            valueLink={this.linkState('address1')}
                            help={this.state.help.address1}
                            disabled={this.state.loading}
                        />
                    </div>
                    <div className="col-md-4">
                        <TextControl
                            placeholder="address line 2"
                            label="Address Line 2"
                            name="address2"
                            ref="address2"
                            hasError={this.state.hasError.address2}
                            valueLink={this.linkState('address2')}
                            help={this.state.help.address2}
                            disabled={this.state.loading}
                        />
                    </div>
                    <div className="col-md-4">
                        <TextControl
                            placeholder="city"
                            name="city"
                            label="City"
                            ref="city"
                            hasError={this.state.hasError.city}
                            valueLink={this.linkState('city')}
                            help={this.state.help.city}
                            disabled={this.state.loading}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2">
                        <TextControl
                            placeholder="state"
                            name="state"
                            label="State"
                            ref="state"
                            hasError={this.state.hasError.state}
                            valueLink={this.linkState('state')}
                            help={this.state.help.state}
                            disabled={this.state.loading}
                        />
                    </div>
                    <div className="col-md-2">
                        <TextControl
                            placeholder="zipcode"
                            name="zipcode"
                            label="Zip Code"
                            ref="zipcode"
                            hasError={this.state.hasError.zipcode}
                            valueLink={this.linkState('zipcode')}
                            help={this.state.help.zipcode}
                            disabled={this.state.loading}
                        />
                    </div>
                    <div className="col-md-3">
                        <TextControl
                            placeholder="phone number"
                            name="phone"
                            label="Contact Phone Number"
                            ref="phone"
                            hasError={this.state.hasError.phone}
                            valueLink={this.linkState('phone')}
                            help={this.state.help.phone}
                            disabled={this.state.loading}
                        />
                    </div>
                    <div className="col-md-5">
                        <TextControl
                            placeholder="http://"
                            name="website1"
                            label="Your Website"
                            ref="website1"
                            hasError={this.state.hasError.website1}
                            valueLink={this.linkState('website1')}
                            help={this.state.help.website}
                            disabled={this.state.website}
                        />
                    </div>
                </div>

                <ControlGroup hideLabel={true} hideHelp={true}>
                    <Button
                        type="submit"
                        inputClasses={{'btn-primary': true}}
                        disabled={this.state.loading}>
                        Submit
                        <Spinner space="left" show={this.state.loading} />
                    </Button>
                </ControlGroup>
                </fieldset>;
        }

        return (
            <section>
                <h1 className="page-header">Create Musician</h1>
                <form onSubmit={this.handleSubmit} >
                    {alerts}
                    {formElements}
                </form>
            </section>
        );
    }
});


module.exports = Component;
