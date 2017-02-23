import React from 'react';
import TextField from 'material-ui/TextField';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

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

    handleMoveUp: function (e) {
        this.props.onMoveCard('up', this.props.id);
    },

    handleMoveDown: function (e) {
        this.props.onMoveCard('down', this.props.id);
    },

    handleMoveRight: function (e) {
        this.props.handleMoveCardRight(this.props.id);
    },

    handleMoveLeft: function (e) {
        this.props.handleMoveCardLeft(this.props.id);
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
                <IconMenu iconButtonElement={<IconButton><MoreVertIcon /></IconButton>} >
                  <MenuItem primaryText="Move Up" onTouchTap={this.handleMoveUp} />
                  <MenuItem primaryText="Move Down" onTouchTap={this.handleMoveDown} />
                  <MenuItem primaryText="Move Right" onTouchTap={this.handleMoveRight} />
                  <MenuItem primaryText="Move Left" onTouchTap={this.handleMoveLeft} />
                  <MenuItem primaryText="Delete" onTouchTap={this.handleDeleteCard} />
                </IconMenu>
                <br/>
            </div>
        );
    }
});

module.exports = Card;
