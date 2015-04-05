var React = require('react/addons');
var Layout = require('../layouts/Default.jsx');


var Component = React.createClass({
    render: function () {

        var feet = <script src="/public/pages/signupFacility.min.js"></script>;

        return (
            <Layout
                title="Sign up"
                feet={feet}
                activeTab="signup">

                <div className="row">
                    <div className="col-sm-6" id="app-mount"></div>
                    <div className="col-sm-6 text-center">
                        <h1 className="page-header">Facility Signup</h1>
                        <p className="lead">
                            Your facility is on the way to offering your paitients the
                            healing power of music! Thank you for helping to remind
                            them they are not alone!
                        </p>
                    </div>
                </div>
            </Layout>
        );
    }
});


module.exports = Component;
