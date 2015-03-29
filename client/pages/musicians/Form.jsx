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

        var formElements;
        if (!this.state.success) {
            formElements = <fieldset>
                <TextControl
                    name="performerName"
                    label="Performer Name"
                    ref="performerName"
                    hasError={this.state.hasError.performerName}
                    valueLink={this.linkState('performerName')}
                    help={this.state.help.performerName}
                    disabled={this.state.loading}
                />
                <TextControl
                    name="contactFirstName"
                    label="Contact First Name"
                    ref="contactFirstName"
                    width="15"
                    hasError={this.state.hasError.contactFirstName}
                    valueLink={this.linkState('contactFirstName')}
                    help={this.state.help.contactFirstName}
                    disabled={this.state.loading}
                    class="col-md-3"
                />
                <TextControl
                    name="contactLastName"
                    label="Contact Last Name"
                    ref="contactLastName"
                    size="15"
                    hasError={this.state.hasError.contactLastName}
                    valueLink={this.linkState('contactLastName')}
                    help={this.state.help.contactLastName}
                    disabled={this.state.loading}
                />
                <TextControl
                    name="address1"
                    label="Address 1"
                    ref="address1"
                    size="15"
                    hasError={this.state.hasError.address1}
                    valueLink={this.linkState('address1')}
                    help={this.state.help.address1}
                    disabled={this.state.loading}
                />
                <TextControl
                    name="address2"
                    label="Address 2"
                    ref="address2"
                    size="15"
                    hasError={this.state.hasError.address2}
                    valueLink={this.linkState('address2')}
                    help={this.state.help.address2}
                    disabled={this.state.loading}
                />
                <TextControl
                    name="city"
                    label="City"
                    ref="city"
                    size="15"
                    hasError={this.state.hasError.city}
                    valueLink={this.linkState('city')}
                    help={this.state.help.city}
                    disabled={this.state.loading}
                />
                <TextControl
                    name="state"
                    label="State"
                    ref="state"
                    size="15"
                    hasError={this.state.hasError.state}
                    valueLink={this.linkState('state')}
                    help={this.state.help.state}
                    disabled={this.state.loading}
                />
                <TextControl
                    name="zipcode"
                    label="Zip Code"
                    ref="zipcode"
                    size="15"
                    hasError={this.state.hasError.zipcode}
                    valueLink={this.linkState('zipcode')}
                    help={this.state.help.zipcode}
                    disabled={this.state.loading}
                />
                <TextControl
                    name="phone"
                    label="Contact Phone"
                    ref="phone"
                    size="15"
                    hasError={this.state.hasError.phone}
                    valueLink={this.linkState('phone')}
                    help={this.state.help.phone}
                    disabled={this.state.loading}
                />
                <TextControl
                    name="website"
                    label="Website URL"
                    ref="website"
                    size="15"
                    hasError={this.state.hasError.website}
                    valueLink={this.linkState('website')}
                    help={this.state.help.website}
                    disabled={this.state.website}
                />







                <ControlGroup hideLabel={true} hideHelp={true}>
                    <Button
                        type="submit"
                        inputClasses={{'btn-primary': true}}
                        disabled={this.state.loading}>

                        Create Musician
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
