var React = require('react');

var GoogleMap = React.createClass({
    getDefaultProps: function () {
        return {
            initialZoom: 8,
            mapCenterLat: 43.6425569,
            mapCenterLng: -79.4073126,
        };
    },
    componentDidMount: function () {
    //    var map = null;
    //    var markers = [];
    //    var client = new XMLHttpRequest();
    //    client.open("GET", "http://api.zippopotam.us/us/" + this.props.musicianZipcode, true);
    //    client.onreadystatechange = function () {
    //        if (client.readyState == 4) {
    //            this.setState({
    //                musicianLat: $.parseJSON(client.responseText).places[0].latitude,
    //                musicianLng: $.parseJSON(client.responseText).places[0].longitude,
    //            }.bind(this));
    //            var markerMusician = new google.maps.Marker({
    //                position: new google.maps.LatLng(this.props.mapCenterLat, this.props.mapCenterLng),
    //                map: map,
    //                title: 'You'
    //            }.bind(this));
    //            markers.push(markerMusician);
    //        }
    //    }.bind(this);
    //    client.send();
    //    client.open("GET", "http://api.zippopotam.us/us/" + this.props.facilityZipcode, true);
    //    client.onreadystatechange = function () {
    //        if (client.readyState == 4) {
    //            this.setState({
    //                facilityLat: $.parseJSON(client.responseText).places[0].latitude,
    //                facilityLng: $.parseJSON(client.responseText).places[0].longitude
    //            });
    //            var markerFacility = new google.maps.Marker({
    //                position: new google.maps.LatLng(this.state.facilityLat, this.state.facilityLng),
    //                map: map,
    //                title: 'Facility'
    //            });
    //            markers.push(markerFacility);
    //            var facilityMarker = new google.maps.Marker({
    //                position: this.mapCenterLatLnng(this.state.facilityLat, this.state.facilityLng),
    //                title: 'Hi',
    //                map: map
    //            });
    //
    //        }
    //    }.bind(this);
    //    client.send();
    //},

    var mapOptions = {
        center: this.mapCenterLatLng(),
        zoom: this.props.initialZoom
    },
    map = new google.maps.Map(this.getDOMNode(), mapOptions);
    var marker = new google.maps.Marker({position: this.mapCenterLatLng(), title: 'Hi', map: map});
    this.setState({map: map});
    },
    mapCenterLatLng: function () {
        var props = this.props;
        return new google.maps.LatLng(props.mapCenterLat, props.mapCenterLng);
    },
    render: function(){
        return(
            <div className="map-gic"> </div>
        )
    }
    });

module.exports = GoogleMap;