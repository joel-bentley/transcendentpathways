var React = require('react/addons');
var ReactRouter = require('react-router');
var DetailsForm = require('./DetailsForm');
var DeleteForm = require('./DeleteForm');
var MusicianStore = require('../../stores/Musician');
var Actions = require('../../actions/Musician');


var LinkedState = React.addons.LinkedStateMixin;
var Link = ReactRouter.Link;
var State = ReactRouter.State;
var Navigation = ReactRouter.Navigation;


var Component = React.createClass({
    mixins: [ LinkedState, State, Navigation ],
    getInitialState: function () {

        MusicianStore.resetDetails();
        MusicianStore.resetDelete();

        Actions.getDetails(this.getParams());

        return {
            details: MusicianStore.getDetails(),
            delete: MusicianStore.getDelete()
        };
    },
    componentDidMount: function () {

        MusicianStore.addChangeListener(this.onStoreChange);
    },
    componentWillUnmount: function () {

        MusicianStore.removeChangeListener(this.onStoreChange);
    },
    onStoreChange: function () {

        this.setState({
            details: MusicianStore.getDetails(),
            delete: MusicianStore.getDelete()
        });
    },
    render: function () {

        if (this.state.details.hydrated && this.state.details.fetchFailure) {
            return (
                <section className="section-musician-details container">
                    <h1 className="page-header">
                        <Link to="musicians">Musicians</Link> / Error
                    </h1>
                    <div className="alert alert-danger">
                        {this.state.details.error}
                    </div>
                </section>
            );
        }

        return (
            <section className="section-musician-details container">
                <h1 className="page-header">
                    <Link to="musicians">Edit Musician Data</Link> / {this.state.details.performerName}
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
