var React = require('react/addons');
var ReactRouter = require('react-router');
var Modal = require('../../../../components/Modal');
var ControlGroup = require('../../../../components/form/ControlGroup');
var TextControl = require('../../../../components/form/TextControl');
var Button = require('../../../../components/form/Button');
var Spinner = require('../../../../components/form/Spinner');
var Actions = require('../../actions/Facility');

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

                this.refs.facilityName.refs.inputField.getDOMNode().focus();
            }.bind(this), 100);
        }
    },
    onSubmit: function (event) {

        event.preventDefault();
        event.stopPropagation();

        Actions.createNew({
            facilityName: this.state.facilityName,
            contactName: this.state.contactName,
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
                <TextControl
                    name="facilityName"
                    ref="facilityName"
                    label="Facility Name"
                    placeholder="facility name"
                    hasError={this.props.data.hasError.facilityName}
                    valueLink={this.linkState('facilityName')}
                    help={this.props.data.help.facilityName}
                    disabled={this.props.data.loading}
                    />
                <TextControl
                    placeholder="name"
                    label="Contact Name"
                    ref="contactName"
                    hasError={this.props.data.hasError.contactFirstName}
                    valueLink={this.linkState('contactName')}
                    help={this.props.data.help.contactName}
                    name="contactName"
                    disabled={this.props.data.loading}
                    />

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

                <div className="row">
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
                </div>
                <div className="row">
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
                    <div className="col-md-6">
                        <TextControl
                            placeholder="http://"
                            name="website"
                            label="Website or Online Reference"
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
                header="Manually Create New Facility Account"
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

