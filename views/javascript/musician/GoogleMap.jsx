var React = require('react');

var GoogleMap = React.createClass({
    getDefaultProps: function () {
        return {
            initialZoom: 8,
            mapCenterLat: 43.6425569,
            mapCenterLng: -79.4073126
        };
    },
    componentDidMount: function () {
        if (this.props.musician && this.props.facility) {
            var mapOptions = {
                    center: this.mapCenterLatLng(),
                    zoom: this.props.initialZoom
                },
                map = new google.maps.Map(this.getDOMNode(), mapOptions);
            var markerMusician = new google.maps.Marker({
                position: this.mapCenterLatLng2(),
                title: this.props.musician.performerName, map: map
            });
            var markerFacility = new google.maps.Marker({
                position: this.mapCenterLatLng3(),
                title: this.props.facility.facilityName, map: map
            });
            var markers = [];
            markers.push(markerMusician, markerFacility);
            var bounds = new google.maps.LatLngBounds();
            for (var i = 0; i < markers.length; i++) {
                bounds.extend(markers[i].getPosition());
            }
            map.setCenter(bounds.getCenter());
            map.fitBounds(bounds);
            map.setZoom(map.getZoom() - 1);

            this.setState({map: map});
        }
    },
    mapCenterLatLng: function () {
        return new google.maps.LatLng(this.props.mapCenterLat, this.props.mapCenterLng);
    },
    mapCenterLatLng2: function () {
        return new google.maps.LatLng(this.props.musician.latitude, this.props.musician.longitude);
    },
    mapCenterLatLng3: function () {
        return new google.maps.LatLng(this.props.facility.latitude, this.props.facility.longitude);
    },
    render: function () {
        return (

                        <div className="map-gic"></div>

        );
    }
});

module.exports = GoogleMap;