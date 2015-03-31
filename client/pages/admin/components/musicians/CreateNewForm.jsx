var React = require('react/addons');
var ReactRouter = require('react-router');
var Modal = require('../../../../components/Modal');
var ControlGroup = require('../../../../components/form/ControlGroup');
var TextControl = require('../../../../components/form/TextControl');
var Button = require('../../../../components/form/Button');
var Spinner = require('../../../../components/form/Spinner');
var Actions = require('../../actions/Musician');

var LinkedState = React.addons.LinkedStateMixin;
var State = ReactRouter.State;
var Navigation = ReactRouter.Navigation;

var Component = React.createClass({
    mixins: [ LinkedState, State, Navigation ],
    getDefaultProps: function () {

        return {
            data: {
                hasError: {},
                help: {}
            }
        };
    },
    getInitialState: function () {

        return {};
    },
    componentWillUnmount: function () {

        clearTimeout(this.timeout);
    },
    componentWillReceiveProps: function(nextProps) {

        if (!nextProps.data.show) {
            this.replaceState({});
        }
        else {
            this.timeout = setTimeout(function () {

                this.refs.performerName.refs.inputField.getDOMNode().focus();
            }.bind(this), 100);
        }
    },
    onSubmit: function (event) {

        event.preventDefault();
        event.stopPropagation();

        Actions.createNew({
            performerName: this.state.performerName,
            contactLastName: this.state.contactLastName,
            contactFirstName: this.state.contactFirstName,
            address1: this.state.address1,
            address2: this.state.address2,
            city: this.state.city,
            state: this.state.state,
            zipcode: this.state.zipcode,
            phone: this.state.phone,
            website: this.state.website
        }, this);
    },
    render: function () {

        var alerts;
        if (this.props.data.error) {
            alerts = <div className="alert alert-danger">
                {this.props.data.error}
            </div>;
        }

        var notice;
        if (this.props.data.success) {
            notice = <div className="alert alert-success">
                Loading data...
            </div>;
        }

        var formElements;
        if (!this.props.data.success) {
            formElements = <fieldset>
                {alerts}
                <div className="row">
                    <div className="col-md-4">
                        <TextControl
                            name="performerName"
                            ref="performerName"
                            label="Performer Name"
                            placeholder="performer name"
                            hasError={this.props.data.hasError.performerName}
                            valueLink={this.linkState('performerName')}
                            help={this.props.data.help.performerName}
                            disabled={this.props.data.loading}
                        />
                    </div>
                    <div className="col-md-4">
                        <TextControl
                            placeholder="first name"
                            label="Contact First Name"
                            ref="contactFirstName"
                            hasError={this.props.data.hasError.contactFirstName}
                            valueLink={this.linkState('contactFirstName')}
                            help={this.props.data.help.contactFirstName}
                            name="contactFirstName"
                            disabled={this.props.data.loading}
                        />
                    </div>
                    <div className="col-md-4">
                        <TextControl
                            placeholder="last name"
                            name="contactLastName"
                            label="Contact Last Name"
                            ref="contactLastName"
                            hasError={this.props.data.hasError.contactLastName}
                            valueLink={this.linkState('contactLastName')}
                            help={this.props.data.help.contactLastName}
                            disabled={this.props.data.loading}
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
                            hasError={this.props.data.hasError.address1}
                            valueLink={this.linkState('address1')}
                            help={this.props.data.help.address1}
                            disabled={this.props.data.loading}
                        />
                    </div>
                    <div className="col-md-4">
                        <TextControl
                            placeholder="address line 2"
                            label="Address Line 2"
                            name="address2"
                            ref="address2"
                            hasError={this.props.data.hasError.address2}
                            valueLink={this.linkState('address2')}
                            help={this.props.data.help.address2}
                            disabled={this.props.data.loading}
                        />
                    </div>
                    <div className="col-md-4">
                        <TextControl
                            placeholder="city"
                            name="city"
                            label="City"
                            ref="city"
                            hasError={this.props.data.hasError.city}
                            valueLink={this.linkState('city')}
                            help={this.props.data.help.city}
                            disabled={this.props.data.loading}
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
                            hasError={this.props.data.hasError.state}
                            valueLink={this.linkState('state')}
                            help={this.props.data.help.state}
                            disabled={this.props.data.loading}
                        />
                    </div>
                    <div className="col-md-2">
                        <TextControl
                            placeholder="zipcode"
                            name="zipcode"
                            label="Zip Code"
                            ref="zipcode"
                            hasError={this.props.data.hasError.zipcode}
                            valueLink={this.linkState('zipcode')}
                            help={this.props.data.help.zipcode}
                            disabled={this.props.data.loading}
                        />
                    </div>
                    <div className="col-md-3">
                        <TextControl
                            placeholder="phone number"
                            name="phone"
                            label="Phone Number"
                            ref="phone"
                            hasError={this.props.data.hasError.phone}
                            valueLink={this.linkState('phone')}
                            help={this.props.data.help.phone}
                            disabled={this.props.data.loading}
                        />
                    </div>
                    <div className="col-md-5">
                        <TextControl
                            placeholder="http://"
                            name="website"
                            label="Your Website"
                            ref="website"
                            hasError={this.props.data.hasError.website}
                            valueLink={this.linkState('website')}
                            help={this.props.data.help.website}
                            disabled={this.props.data.website}
                        />
                    </div>
                </div>
                <ControlGroup hideLabel={true} hideHelp={true}>
                    <Button
                        type="submit"
                        inputClasses={{'btn-primary': true}}
                        disabled={this.props.data.loading}>

                        Create new
                        <Spinner space="left" show={this.props.data.loading} />
                    </Button>
                </ControlGroup>
            </fieldset>;
        }

        return (
            <Modal
                header="Create new"
                show={this.props.data.show}
                onClose={Actions.hideCreateNew}>

                <form onSubmit={this.onSubmit}>
                    {notice}
                    {formElements}
                </form>
            </Modal>
        );
    }
});


module.exports = Component;

