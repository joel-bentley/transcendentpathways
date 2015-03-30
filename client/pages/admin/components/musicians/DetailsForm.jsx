var React = require('react/addons');
var ControlGroup = require('../../../../components/form/ControlGroup');
var TextControl = require('../../../../components/form/TextControl');
var Button = require('../../../../components/form/Button');
var Spinner = require('../../../../components/form/Spinner');
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
                contactFirstName: nextProps.data.contactFirstName,
                contactLastName: nextProps.data.contactLastName
            });
        }
    },
    handleSubmit: function (event) {

        event.preventDefault();
        event.stopPropagation();

        Actions.saveDetails({
            id: this.props.data._id,
            performerName: this.state.performerName,
            contactFirstName: this.state.contactFirstName,
            contactLastName: this.state.contactLastName
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
                    label="Performer Name"
                    hasError={this.props.data.hasError.performerName}
                    valueLink={this.linkState('performerName')}
                    help={this.props.data.help.performerName}
                    disabled={this.props.data.loading}
                />
                <TextControl
                    name="contactFirstName"
                    label="Contact First Name"
                    hasError={this.props.data.hasError.contactFirstName}
                    valueLink={this.linkState('contactFirstName')}
                    help={this.props.data.help.contactFirstName}
                    disabled={this.props.data.loading}
                />
                <TextControl
                    name="contactLastName"
                    label="Contact Last Name"
                    hasError={this.props.data.hasError.contactLastName}
                    valueLink={this.linkState('contactLastName')}
                    help={this.props.data.help.contactLastName}
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
