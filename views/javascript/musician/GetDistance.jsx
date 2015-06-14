var React = require('react');
var GoogleMap = require('./GoogleMap.jsx');

var GetDistance = React.createClass({
    propTypes: function(){
        return({
            musician: React.PropTypes.object.isRequired,
            facility: React.PropTypes.object.isRequired
        });
    },
    getInitialState: function(){
        return({
            distanceResults: null
        })
    },
    geoCode: function(){

    },
    componentDidMount: function() {
        var musician = this.props.musician;
        var facility = this.props.facility;

        var musicianAddress = musician.address1 + " " + musician.address2 + " " + musician.city + " " + musician.zipcode;
        var facilityAddress = facility.address1 + " " + facility.address2 + " " + facility.city  + " " + facility.zipcode;
        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
            {
                origins: [musicianAddress],
                destinations: [facilityAddress],
                travelMode: google.maps.TravelMode.DRIVING,
                unitSystem: google.maps.UnitSystem.IMPERIAL,
                durationInTraffic: false
            }, this.callback);
    },

    callback: function(response, status){
        if (status == google.maps.DistanceMatrixStatus.OK) {
            var origins = response.originAddresses;
            var destinations = response.destinationAddresses;

            for (var i = 0; i < origins.length; i++) {
                var results = response.rows[i].elements;
                for (var j = 0; j < results.length; j++) {
                    var element = results[j];
                    var distance = element.distance.text;
                    {
                        this.setState({
                            distanceResults: distance
                        })
                    }
                }
            }
        } else {
            console.log('distance matrix failuer');
        }
    },
   render: function(){
       return(
           <div>
               {this.state.distanceResults ? 'Distance to Facility: '+this.state.distanceResults: 'Loading...'}

           </div>
       );

   }
});

module.exports = GetDistance;