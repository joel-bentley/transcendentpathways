  var React = require('react/addons');
var Layout = require('../layouts/Default.jsx');


var Component = React.createClass({
    render: function () {

        var neck = <link rel='stylesheet' href="/public/pages/home.min.css" />;

        return (
            <Layout
                title="Transcendent Pathways"
                neck={neck}
                activeTab="home">

                <div className="jumbotron">
                    <h1>TP Scheduler</h1>
                    <p className="lead">
                        A scheduling system for Transcendent Pathways.
                    <br/>Matching musicians with facilities for the patients who need them.

                        <div>
                            <a className="btn btn-primary btn-lg" href="/signup">
                                Create an account
                            </a>
                            &nbsp; or &nbsp;
                            <a className="btn btn-warning btn-lg" href="/login/forgot">
                                Reset your password
                            </a>
                        </div>
                    </p>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <h3>Muscians</h3>
                                <p>
                                    Find performance opportunities at healthcare
                                    facilities convenient for you. Create your account,
                                    manage your bookings, and provide therapy to those
                                    who need it.

                                </p>
                                <a href="/musician" className="btn btn-default btn-block">
                                    Musician Info
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <h3>Healthcare Facilities</h3>
                                <p>
                                     Let us help you bring powerful live performances of new music
                                     to those who feel marginalized by their affliction. Together we can
                                      remind individuals that they are never alone.
                                </p>
                                <a href="/signup" className="btn btn-default btn-block">
                                    Schedule your Facility
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <h3>Contact us</h3>
                                <p>
                                    Transcendent Pathways collects charitable donations for the purpose
                                     of hiring concert musicians to perform in local healthcare facilities
                                     where patients can benefit the most.
                                </p>
                                <a href="/contact" className="btn btn-default btn-block">
                                    Learn more
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
});


module.exports = Component;