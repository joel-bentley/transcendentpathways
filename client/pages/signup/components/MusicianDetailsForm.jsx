var React = require('react/addons');
var ControlGroup = require('../../../components/form/ControlGroup');
var TextControl = require('../../../components/form/TextControl');
var TextAreaControl = require('../../../components/form/TextareaControl');
var Button = require('../../../components/form/Button');
var Spinner = require('../../../components/form/Spinner');
var SelectControl = require('../../../components/form/SelectControl');
var Store = require('../stores/Store');
var Actions = require('../Actions');



var Component = React.createClass({
    mixins: [ React.addons.LinkedStateMixin, React.State],
    contextTypes: {
        router: React.PropTypes.func
    },
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

        Actions.saveDetails({
            performerName: this.state.performerName,
            userName: 
            address1: this.state.address1,
            address2: this.state.address2,
            city: this.state.city,
            state: this.state.state,
            zipcode: this.state.zipcode,
            phone: this.state.phone,
            website: this.state.website,
            references: this.state.references,
            instruments: this.state.instruments
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
                <h3 className="page-header">Musician / Performer Details</h3>
                {alerts}
                <TextControl
                    name="performerName"
                    label="Performer(s) Name"
                    ref="performerName"
                    hasError={this.state.hasError.performerName}
                    valueLink={this.linkState('performerName')}
                    help={this.state.help.performerName}
                    disabled={this.state.loading}
                />
                <TextControl
                    name="address1"
                    label="Address Line 1"
                    hasError={this.state.hasError.address1}
                    valueLink={this.linkState('address1')}
                    help={this.state.help.address1}
                    disabled={this.state.loading}
                />
                <TextControl
                    name="address2"
                    label="Address Line 2"
                    hasError={this.state.hasError.address2}
                    valueLink={this.linkState('address2')}
                    help={this.state.help.address2}
                    disabled={this.state.loading}
                />
                <TextControl
                    name="city"
                    label="City"
                    hasError={this.state.hasError.city}
                    valueLink={this.linkState('city')}
                    help={this.state.help.city}
                    disabled={this.state.loading}
                />
                <TextControl
                    name="state"
                    label="State"
                    hasError={this.state.hasError.state}
                    valueLink={this.linkState('state')}
                    help={this.state.help.state}
                    disabled={this.state.loading}
                />
                <TextControl
                    name="zipcode"
                    label="ZipCode"
                    hasError={this.state.hasError.zipcode}
                    valueLink={this.linkState('zipcode')}
                    help={this.state.help.zipcode}
                    disabled={this.state.loading}
                />
                <TextControl
                    name="phone"
                    label="Contact Phone"
                    hasError={this.state.hasError.phone}
                    valueLink={this.linkState('phone')}
                    help={this.state.help.phone}
                    disabled={this.state.loading}
                />
                <TextControl
                    name="website"
                    label="Website"
                    hasError={this.state.hasError.website}
                    valueLink={this.linkState('website')}
                    help={this.state.help.website}
                    disabled={this.state.loading}
                />
                <TextAreaControl
                    name="references"
                    label="References"
                    rows="5"
                    hasError={this.state.hasError.references}
                    valueLink={this.linkState('references')}
                    help={this.state.help.references}
                    disabled={this.state.loading}
                />
                <TextAreaControl
                    name="instruments"
                    label="Instruments"
                    rows="5"
                    hasError={this.state.hasError.instruments}
                    valueLink={this.linkState('instruments')}
                    help={this.state.help.instruments}
                    disabled={this.state.loading}
                />
                <ControlGroup hideLabel={true} hideHelp={true}>
                    <Button
                        type="submit"
                        inputClasses={{'btn-primary': true}}
                        disabled={this.state.loading}>
                        Save
                        <Spinner space="left" show={this.state.loading} />
                    </Button>
                </ControlGroup>
            </fieldset>;
        }

        return (
            <form onSubmit={this.handleSubmit}>
                {formElements}
            </form>
        );
    }
});


module.exports = Component;
