var React = require('react');

var GoogleMap = React.createClass({
    getDefaultProps: function () {
        return {
            initialZoom: 13,
            mapCenterLat: 39.5333,
            mapCenterLng: -113.4073126
        };
    },
    componentDidMount: function () {
        var mapOptions = {
                center: this.mapCenterLatLng(),
                zoom: this.props.initialZoom
            },
            map = new google.maps.Map(this.getDOMNode(), mapOptions);
        //var marker = new google.maps.Marker({position: this.mapCenterLatLng(), title: 'Hi', map: map});
        this.setState({
            map: map
        });
    },
    mapCenterLatLng: function () {
        var client = new XMLHttpRequest();
        client.open("GET", "http://api.zippopotam.us/us/90210", true);
        client.onreadystatechange = function() {
            if(client.readyState == 4) {
                console.log($.parseJSON(client.responseText).places[0].latitude);
                console.log($.parseJSON(client.responseText).places[0].longitude);

                return new google.maps.LatLng($.parseJSON(client.responseText).places[0].latitude , $.parseJSON(client.responseText).places[0].longitude);
            } else{
                return new google.maps.LatLng(39.53 , -113.4073126);

            }
        };

        client.send();

    },
    render: function () {
        return (
            <div className='map-gic'></div>
        );
    }
});

module.exports = GoogleMap;