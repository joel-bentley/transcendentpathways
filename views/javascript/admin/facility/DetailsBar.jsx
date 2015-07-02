var React = require('react');
var FacilityFields = require('./FacilityFields.jsx');

var DetailsBar = React.createClass({
    componentDidMount: function(){
        this.placeDiv(0,this.props.offset);
    },
    componentDidUpdate: function(){
        this.placeDiv(0,this.props.offset);
    },
    placeDiv: function(x_pos, y_pos) {
        var d = this.getDOMNode();
        d.style.position = "absolute";
        d.style.left = x_pos+'px';
        d.style.top = y_pos-121+'px';
    },
    render: function(){
        return (
            <div className="col-sm-12 slideTransition">
                <div>
                    <FacilityFields fieldValues = {this.props.facility}
                                    saveValues = {this.props.saveValues}
                                    showNotes = {this.props.showNotes}
                                    notes = {this.props.notes}
                    />
                </div>
            </div>
        )}
});

module.exports = DetailsBar;