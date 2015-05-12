var React = require('react/addons');
var FacilityFields = require('./FacilityFields.jsx');

var DetailsBar = React.createClass({
    render: function(){
        return (
            <div >

                <div >
                    <FacilityFields  fieldValues = {this.props.facility}
                                     saveValues = {this.props.saveValues}
                        />
                </div>

            </div>
        )}
});

module.exports = DetailsBar;