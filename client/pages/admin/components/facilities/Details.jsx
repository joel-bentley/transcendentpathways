var React = require('react/addons');
var ReactRouter = require('react-router');
var DetailsForm = require('./DetailsForm');
var DeleteForm = require('./DeleteForm');
var FacilityStore = require('../../stores/Facility');
var Actions = require('../../actions/Facility');


var LinkedState = React.addons.LinkedStateMixin;
var Link = ReactRouter.Link;
var State = ReactRouter.State;
var Navigation = ReactRouter.Navigation;


var Component = React.createClass({
    mixins: [ LinkedState, State, Navigation ],
    getInitialState: function () {

        FacilityStore.resetDetails();
        FacilityStore.resetDelete();

        Actions.getDetails(this.getParams());

        return {
            details: FacilityStore.getDetails(),
            delete: FacilityStore.getDelete()
        };
    },
    componentDidMount: function () {

        FacilityStore.addChangeListener(this.onStoreChange);
    },
    componentWillUnmount: function () {

        FacilityStore.removeChangeListener(this.onStoreChange);
    },
    onStoreChange: function () {

        this.setState({
            details: FacilityStore.getDetails(),
            delete: FacilityStore.getDelete()
        });
    },
    render: function () {

        if (this.state.details.hydrated && this.state.details.fetchFailure) {
            return (
                <section className="section-facility-details container">
                    <h1 className="page-header">
                        <Link to="facilities">Facilities</Link> / Error
                    </h1>
                    <div className="alert alert-danger">
                        {this.state.details.error}
                    </div>
                </section>
            );
        }

        return (
            <section className="section-facility-details container">
                <h1 className="page-header">
                    <Link to="facilities">Facilities</Link> / {this.state.details._id}
                </h1>
                <div className="row">
                    <div className="col-sm-6">
                        <DetailsForm data={this.state.details} />
                        <DeleteForm
                            details={this.state.details}
                            data={this.state.delete}
                        />
                    </div>
                </div>
            </section>
        );
    }
});


module.exports = Component;
