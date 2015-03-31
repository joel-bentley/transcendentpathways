/* global window */
var React = require('react/addons');
var ReactRouter = require('react-router');
var Paging = require('../../../../components/Paging');
var Actions = require('../../actions/Musician');
var MusicianStore = require('../../stores/Musician');
var FilterForm = require('./FilterForm');
var CreateNewForm = require('./CreateNewForm');
var Results = require('./Results');


var State = ReactRouter.State;
var Navigation = ReactRouter.Navigation;


var Component = React.createClass({
    mixins: [ State, Navigation ],
    getInitialState: function () {

        MusicianStore.resetResults();
        MusicianStore.resetCreateNew();

        Actions.getResults(this.getQuery());

        return {
            results: MusicianStore.getResults(),
            createNew: MusicianStore.getCreateNew()
        };
    },
    componentWillReceiveProps: function(nextProps) {

        Actions.getResults(this.getQuery());
    },
    componentDidMount: function () {

        MusicianStore.addChangeListener(this.onStoreChange);
    },
    componentWillUnmount: function () {

        MusicianStore.removeChangeListener(this.onStoreChange);
    },
    onStoreChange: function () {

        this.setState({
            results: MusicianStore.getResults(),
            createNew: MusicianStore.getCreateNew()
        });
    },
    onFiltersChange: function (event) {

        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }

        this.transitionTo('musicians', {}, this.refs.filters.state);
        window.scrollTo(0, 0);
    },
    onPageChange: function (page) {

        this.refs.filters.changePage(page);
    },
    onNewClick: function () {

        Actions.showCreateNew();
    },
    render: function () {

        return (
            <section className="section-musicians container">
                <div className="page-header">
                    <button
                        ref="createNew"
                        className="btn btn-default pull-right"
                        onClick={this.onNewClick}>

                        Create new
                    </button>
                    <h1>Musicians</h1>
                </div>
                <FilterForm
                    ref="filters"
                    query={this.getQuery()}
                    loading={this.state.results.loading}
                    onChange={this.onFiltersChange}
                />
                <Results data={this.state.results.data} />
                <Paging
                    ref="paging"
                    pages={this.state.results.pages}
                    items={this.state.results.items}
                    loading={this.state.results.loading}
                    onChange={this.onPageChange}
                />
                <CreateNewForm data={this.state.createNew} />
            </section>
        );
    }
});


module.exports = Component;
