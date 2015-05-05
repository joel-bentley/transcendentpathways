var React = require('react/addons');
var MusicianFields = require('./MusicianFields.jsx');

var DetailsBar = React.createClass({
    render: function(){
        return (
            <div className="Detail">

                <div className="panel-body">
                    <MusicianFields  fieldValues = {this.props.musician}
                                     saveValues = {this.props.saveValues}
                        />
                </div>

            </div>
        )}
});

module.exports = DetailsBar;