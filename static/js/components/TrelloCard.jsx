var React = require('react');
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

var Card = React.createClass({

    handleChange: function (e) {
        var card = e.target.value;
        var id = e.target.id;
        this.props.onCardChange(card, id);
    },

    render: function() {
        var id = this.props.id.toString();
        return (
            <div>
                <TextField
                  id={id}
                  value={this.props.card}
                  multiLine={true}
                  rowsMax={4}
                  onChange={this.handleChange}
                />
                <FlatButton
                  label='X'
                />
                <br/>
            </div>
        );
    }
});

module.exports = Card;
