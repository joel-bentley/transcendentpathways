var React = require('react/addons');
var ControlGroup = require('../../../../components/form/ControlGroup');
var TextControl = require('../../../../components/form/TextControl');
var TextAreaControl = require('../../../../components/form/TextareaControl');
var Button = require('../../../../components/form/Button');
var Spinner = require('../../../../components/form/Spinner');
var SelectControl = require('../../../../components/form/SelectControl');
var Actions = require('../../actions/Musician');


var Component = React.createClass({
    mixins: [ React.addons.LinkedStateMixin ],
    getInitialState: function () {

        return {};
    },
    componentWillReceiveProps: function (nextProps) {

        if (!this.state.hydrated) {
            this.setState({
                hydrated: nextProps.data.hydrated,
                performerName: nextProps.data.performerName,
                contactName: nextProps.data.contactName,
                address1: nextProps.data.address1,
                address2: nextProps.data.address2,
                city: nextProps.data.city,
                state: nextProps.data.state,
                zipcode: nextProps.data.zipcode,
                phone: nextProps.data.phone,
                website: nextProps.data.website,
                instruments: nextProps.data.instruments,
                approvedToPerform: nextProps.data.approvedToPerform,
                approvedDate: nextProps.data.approvedDate,
                performancesCompleted: nextProps.data.performancesCompleted
            });
        }
    },
    handleSubmit: function (event) {

        event.preventDefault();
        event.stopPropagation();

        Actions.saveDetails({
            id: this.props.data._id,
            performerName: this.state.performerName,
            contactName: this.state.contactName,
            address1: this.state.address1,
            address2: this.state.address2,
            city: this.state.city,
            state: this.state.state,
            zipcode: this.state.zipcode,
            phone: this.state.phone,
            website: this.state.website,
            instruments: this.state.instruments,
            approvedToPerform: this.state.approvedToPerform,
            approvedDate: this.state.approvedDate,
            performancesCompleted: this.state.performancesCompleted
        });
    },
    render: function () {

        var alerts = [];
        if (this.props.data.success) {
            alerts.push(<div key="success" className="alert alert-success">
                Success. Changes have been saved.
            </div>);
        }
        else if (this.props.data.error) {
            alerts.push(<div key="danger" className="alert alert-danger">
                {this.props.data.error}
            </div>);
        }

        var notice;
        if (!this.props.data.hydrated) {
            notice = <div className="alert alert-info">
                Loading data...
            </div>;
        }

        var formElements;
        if (this.props.data.hydrated) {
            formElements = <fieldset>
                <legend>Details</legend>
                {alerts}
                <TextControl
                    name="performerName"
                    label="Group/Performer Name"
                    hasError={this.props.data.hasError.performerName}
                    valueLink={this.linkState('performerName')}
                    help={this.props.data.help.performerName}
                    disabled={this.props.data.loading}
                />
                <TextControl
                    name="contactName"
                    label="Contact Name"
                    hasError={this.props.data.hasError.contactName}
                    valueLink={this.linkState('contactName')}
                    help={this.props.data.help.contactName}
                    disabled={this.props.data.loading}
                />
                <TextControl
                    name="address1"
                    label="Address Line 1"
                    hasError={this.props.data.hasError.address1}
                    valueLink={this.linkState('address1')}
                    help={this.props.data.help.address1}
                    disabled={this.props.data.loading}
                />
                <TextControl
                    name="address2"
                    label="Address Line 2"
                    hasError={this.props.data.hasError.address2}
                    valueLink={this.linkState('address2')}
                    help={this.props.data.help.address2}
                    disabled={this.props.data.loading}
                />
                <TextControl
                    name="city"
                    label="City"
                    hasError={this.props.data.hasError.city}
                    valueLink={this.linkState('city')}
                    help={this.props.data.help.city}
                    disabled={this.props.data.loading}
                />
                <TextControl
                    name="state"
                    label="State"
                    hasError={this.props.data.hasError.state}
                    valueLink={this.linkState('state')}
                    help={this.props.data.help.state}
                    disabled={this.props.data.loading}
                />
                <TextControl
                    name="zipcode"
                    label="ZipCode"
                    hasError={this.props.data.hasError.zipcode}
                    valueLink={this.linkState('zipcode')}
                    help={this.props.data.help.zipcode}
                    disabled={this.props.data.loading}
                />
                <TextControl
                    name="phone"
                    label="Contact Phone"
                    hasError={this.props.data.hasError.phone}
                    valueLink={this.linkState('phone')}
                    help={this.props.data.help.phone}
                    disabled={this.props.data.loading}
                />
                <TextControl
                    name="website"
                    label="Website"
                    hasError={this.props.data.hasError.website}
                    valueLink={this.linkState('website')}
                    help={this.props.data.help.website}
                    disabled={this.props.data.loading}
                />
                <TextAreaControl
                    name="instruments"
                    label="Instruments"
                    rows="5"
                    hasError={this.props.data.hasError.instruments}
                    valueLink={this.linkState('instruments')}
                    help={this.props.data.help.instruments}
                    disabled={this.props.data.loading}
                />
                <SelectControl
                    default={false}
                    name="approvedToPerform"
                    label="Approved?"
                    disabled={this.props.data.loading}
                    valueLink={this.linkState('approvedToPerform')}>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </SelectControl>

                <TextControl
                    name="approvedDate"
                    label="Approved Date"
                    hasError={this.props.data.hasError.approvedDate}
                    valueLink={this.linkState('approvedDate')}
                    help={this.props.data.help.approvedDate}
                    disabled={this.props.data.loading}
                />
                <TextControl
                    name="performancesCompleted"
                    label="Performances Completed"
                    hasError={this.props.data.hasError.performancesCompleted}
                    valueLink={this.linkState('performancesCompleted')}
                    help={this.props.data.help.performancesCompleted}
                    disabled={this.props.data.loading}
                />



                <ControlGroup hideLabel={true} hideHelp={true}>
                    <Button
                        type="submit"
                        inputClasses={{'btn-primary': true}}
                        disabled={this.props.data.loading}>

                        Save changes
                        <Spinner space="left" show={this.props.data.loading} />
                    </Button>
                </ControlGroup>
            </fieldset>;
        }

        return (
            <form onSubmit={this.handleSubmit}>
                {notice}
                {formElements}
            </form>
        );
    }
});


module.exports = Component;
