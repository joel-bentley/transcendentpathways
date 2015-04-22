var React = require('react');

var Search = React.createClass({
    render: function(){
        return (
            <section className="section-users container">
            <form>
                <div className="row">
                    <div className="col-sm-3">
                        <label>Performer Name</label>
                        <input autoFocus
                            type='text'
                            name="peformerName"
                            placeholder="Performer name"
                            className="form-control">
                        </input>
                    </div>
                    <div className="col-sm-3">
                        <label>Contact Name</label>
                        <input
                            ref="limit"
                            type="text"
                            name="contactName"
                            className="form-control"
                            placeholder="Contact name">
                        </input>
                    </div>
                    <div className="col-sm-2">
                        <label>Approved ?</label>
                        <select
                            ref="limit"
                            type='select'
                            name="approvedToPerform"
                            className="form-control">
                            <option value="">-- choose--</option>
                            <option value={true}>true</option>
                            <option value={false}>false</option>
                        </select>
                    </div>
                    <div className="col-sm-2">
                        <label>Sort By</label>
                        <select
                            ref="sort"
                            name="sort"
                            className="form-control">
                            <option value="">-- choose--</option>
                            <option value="performerName">Peformer &#9650;</option>
                            <option value="-performerName">Performer &#9660;</option>
                            <option value="contactName">Contact &#9650;</option>
                            <option value="-contactName">Contact &#9660;</option>
                        </select>
                    </div>
                    <div className="col-sm-2">
                        <label>Limit</label>
                        <select
                            ref="limit"
                            name="limit"
                            className="form-control">
                            <option value={10}>10 items</option>
                            <option value={20}>20 items</option>
                            <option value={50}>50 items</option>
                            <option value={100}>100 items</option>
                        </select>
                    </div>
                </div>
            </form>
            <br/>
            </section>
        )
    }
});

module.exports = Search;