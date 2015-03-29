var React = require('react/addons');
var Layout = require('../layouts/Default.jsx');


var Component = React.createClass({
    render: function () {

        var feet = <script src="/public/pages/musician.min.js"></script>;

        return (
            <Layout
                title="Musician"
                feet={feet}
                activeTab="musician">

                <div className="col-sm-9" id="app-mount"></div>
                <div className="col-sm-3 text-center"> </div>
            </Layout>
        );
    }
});


module.exports = Component;