var React = require('react/addons');
var Layout = require('../layouts/Default.jsx');


var Component = React.createClass({
    render: function () {

        var feet = <script src="/public/pages/musicians.min.js"></script>;

        return (
            <Layout
                title="Musicians"
                feet={feet}
                activeTab="musicians">

                <div className="row">
                        <div className="col-sm-6" id="app-mount"></div>
                        <div className="col-sm-6 text-center"></div>



                </div>
            </Layout>
        );
    }
});


module.exports = Component;
