var React = require('react');
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

var Card = React.createClass({
    getInitialState: function () {
        return {
            modified: false
        };
    },

    handleChange: function (e) {
        var card = e.target.value;
        var id = e.target.id;
        this.props.onCardChange(card, id);
        this.setState({modified: true});
    },

    handleUpdateCard: function (e) {
        if (this.state.modified == true) {
            this.props.onUpdateCard();
            this.setState({modified: false});
        }
    },

    handleDeleteCard: function (e) {
        var id = this.props.id;
        this.props.onDeleteCard(id);
    },

    render: function() {
        var id = this.props.id.toString();
        return (
            <div>
                <TextField
                  id={id}
                  hintText='Empty Card'
                  value={this.props.card}
                  multiLine={true}
                  rowsMax={4}
                  onChange={this.handleChange}
                  onBlur={this.handleUpdateCard}
                />
                <FlatButton
                  label='X'
                  onTouchTap={this.handleDeleteCard}
                />
                <br/>
            </div>
        );
    }
});

module.exports = Card;
