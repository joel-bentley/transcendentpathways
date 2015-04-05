var React = require('react/addons');
var Layout = require('../layouts/Default.jsx');


var Component = React.createClass({
    render: function () {

        var feet = <script src="/public/pages/signupMusician.min.js"></script>;

        return (
            <Layout
                title="Sign up"
                feet={feet}
                activeTab="signup">

                <div className="row">
                    <div className="col-sm-6" id="app-mount"></div>
                    <div className="col-sm-6 text-center">
                        <h1 className="page-header">Musician Signup</h1>
                        <p className="lead">
                            This won't take long! We will match you with
                            performance opportunities in the Bay Area!
                        </p>
                    </div>
                </div>
            </Layout>
        );
    }
});


module.exports = Component;
