var React = require('react');
var GetDistance = require('./GetDistance.jsx');

var EventRow = React.createClass({
    getDefaultProps: function(){
        return({
            zipcodeApiUrl: 'http://www.zipcodeapi.com/rest/',
            secretKey: 'SwIN9Y52MkGXHB1cjYG99bMJyai4FfVyMEmWDrYqMFntgpGAnnJxyvh7GzbmP7UB'
        });
    },

    render: function(){

        return(
            <div className="panel panel-primary" key={event._id}>
                <div className="panel-heading">
                    <h4 className="panel-title"> {this.props.event.facilityName + ' on ' +
                    new Date(this.props.event.start).toDateString()} </h4>
                </div>
                <div className="panel-body">
                    <div >Start Date: {new Date(this.props.event.start).toDateString()}</div>
                    <div>Facility Name: {this.props.event.facilityName}</div>
                    <div>Start Time: {new Date(this.props.event.start).toLocaleTimeString()}</div>
                    <div>End Time: {new Date(this.props.event.end).toLocaleTimeString()}</div>
                    {this.props.facility ? <div>Facility Zipcode: {this.props.facility.zipcode}</div>: null}
                    {this.props.musician ? <div>Musician Zipcode: {this.props.musician.zipcode}</div>: null}
                    {this.props.musician ?
                        <GetDistance
                            musicianZipcode={this.props.musician.zipcode}
                            facilityZipcode={this.props.facility.zipcode}
                            /> :
                        null}
                    <div id="map-canvas"> </div>

                </div>
            </div>
        )
    }
});

module.exports = EventRow;