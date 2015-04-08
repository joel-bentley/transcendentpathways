var React = require('react/addons');
var Layout = require('../layouts/Default.jsx');


var Component = React.createClass({
    render: function () {

        var feet = <script src="/public/pages/signupMusicianDetails.min.js"></script>;

        return (
            <Layout
                title="Sign up"
                feet={feet}
                activeTab="signup">

                <div className="row">
                    <div className="col-sm-6" id="app-mount"></div>
                    <div className="col-sm-6 text-center">
                        <h3 className="page-header">Final Step!</h3>
                        <p className="lead">
                            This is the last step! We will match you with
                            performance opportunities in the Bay Area!
                        </p>
                    </div>
                </div>
            </Layout>
        );
    }
});


module.exports = Component;
