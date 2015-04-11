var React = require('react/addons');
var Layout = require('../layouts/Default.jsx');


var Component = React.createClass({
    render: function () {

        return (
            <Layout
                title="About us"
                activeTab="about">

                <div className="row">
                    <div className="col-sm-6">
                        <h1 className="page-header">About us</h1>
                        {/*<div className="media">
                            <div className="pull-left">
                                <div className="media-object">
                                    <i className="fa fa-camera-retro fa-4x"></i>
                                </div>
                            </div>
                            <div className="media-body">
                                <p>
                                    Cras sit amet nibh libero, in gravida
                                    nulla. Nulla vel metus scelerisque ante
                                    sollicitudin commodo. Cras purus odio,
                                    vestibulum in vulputate at, tempus viverra
                                    turpis.

                                    Cras sit amet nibh libero, in gravida
                                    nulla. Nulla vel metus scelerisque ante
                                    sollicitudin commodo. Cras purus odio,
                                    vestibulum in vulputate at, tempus viverra
                                    turpis.
                                </p>
                            </div>
                        </div>
                        <div className="media">
                            <div className="pull-left">
                                <div className="media-object">
                                    <i className="fa fa-camera-retro fa-4x"></i>
                                </div>
                            </div>
                            <div className="media-body">
                                <h4 className="media-heading">Nick Jackson</h4>
                                <p>
                                    Cras sit amet nibh libero, in gravida
                                    nulla. Nulla vel metus scelerisque ante
                                    sollicitudin commodo. Cras purus odio,
                                    vestibulum in vulputate at, tempus viverra
                                    turpis.
                                </p>
                            </div>
                        </div>*/}
                    </div>
                    <div className="col-sm-6 text-center">
                        {/*<h1 className="page-header">Header</h1>
                        <p className="lead">

                        </p>
                        <i className="fa fa-volume-up bamf"></i>*/}
                    </div>
                </div>
            </Layout>
        );
    }
});


module.exports = Component;
