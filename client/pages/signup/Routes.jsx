var React = require('react/addons');
var ReactRouter = require('react-router');
var App = require('./components/App');
// var Home = require('./components/Home');
var NotFound = require('./components/NotFound');
var MusicianSignup = require('./components/MusicianSignup');
var FacilitySignup = require('./components/FacilitySignup');
var MusicianDetailsForm = require('./components/MusicianDetailsForm');


var Route = ReactRouter.Route;
var DefaultRoute = ReactRouter.DefaultRoute;
var NotFoundRoute = ReactRouter.NotFoundRoute;


var Routes = (
    <Route path="/signup" name="app" handler={App}>
        <DefaultRoute name="home" handler={App} />
        <NotFoundRoute name="notFound" handler={NotFound} />

        <Route path="musician" name="musician" handler={MusicianSignup} />
        <Route path="facility" name="facility" handler={FacilitySignup} />
        <Route path="musicianDetailsForm" name = "musicianDetailsForm" handler={MusicianDetailsForm} />
    </Route>
);


module.exports = Routes;
