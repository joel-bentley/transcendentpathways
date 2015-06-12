var React = require('react');
var GoogleMap = require('./GoogleMap.jsx');

var GetDistance = React.createClass({
    propTypes: function(){
        return({
            musicianZipcode: null,
            facilityZipcode: null
        });
        },
    getInitialState: function(){
        return({
            distanceResults: null,
            lat: 'x',
            lon: 'x'
        })
    },
    geoCode: function(){

    },
    componentDidMount: function() {
        var origin1 = this.props.musicianZipcode;
        var destinationA = this.props.facilityZipcode;

        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
            {
                origins: [origin1],
                destinations: [destinationA],
                travelMode: google.maps.TravelMode.DRIVING,
                unitSystem: google.maps.UnitSystem.IMPERIAL,
                durationInTraffic: true
            }, this.callback);
    },

    callback: function(response, status) {
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