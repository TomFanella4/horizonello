import React from 'react';

import TrelloCard from './TrelloCard.jsx';
import WebService from '../WebService.js';

import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import NavigationLeft from 'material-ui/svg-icons/navigation/chevron-left';
import NavigationRight from 'material-ui/svg-icons/navigation/chevron-right';
import TextField from 'material-ui/TextField';

var TrelloList = React.createClass({
    getInitialState: function () {
        return {
            name: this.props.name,
            cards: this.props.cards,
            newCard: '',
            nameErrorText: ''
        };
    },

    handleNameChange: function (e) {
        var name = e.target.value;
        if (name == '') {
            this.setState({nameErrorText: 'A list must have a name'});
        } else if (this.state.nameErrorText != '') {
            this.setState({nameErrorText: ''});
        }
        this.setState({name: e.target.value});
    },

    handleCardChange: function (newCard, id) {
        var cards = this.state.cards;
        cards[parseInt(id)] = newCard;
        this.setState({
            cards: cards,
        });
    },

    handleNewCardChange: function (e) {
        this.setState({newCard: e.target.value});
    },

    updateList: function () {
        var id = this.props.id;
        var name = this.state.name != '' ? this.state.name : this.props.name;
        var cards = this.state.cards;
        var pos = this.props.pos;
        var parentContext = this.props.parentContext;

        WebService.updateList(id, name, pos, cards, parentContext);
    },

    handleListNameChange: function (e) {
        var name = this.state.name;
        if (name != this.props.name && name != '') {
            this.updateList();
        }
    },

    handleDeleteList: function (e) {
        var id = this.props.id;
        var parentContext = this.props.parentContext;

        this.props.postSnack('List ' + this.state.name + ' was deleted');

        WebService.deleteList(id, parentContext);
    },

    handleAddCard: function (e) {
        if (e.target.value == '') {
            return;
        }
        var cards = this.state.cards;

        if (cards) {
            this.setState({cards: cards.concat(e.target.value)}, function () {
                this.updateList();
                this.setState({newCard: ''});
            });
        } else {
            this.setState({cards: [e.target.value]}, function () {
                this.updateList();
                this.setState({newCard: ''});
            });
        }

        this.props.postSnack('Card ' + e.target.value + ' was added');
    },

    handleDeleteCard: function (id) {
        var cards = this.state.cards.slice(0);
        cards.splice(id, 1);

        this.props.postSnack('Card ' + this.state.cards[id] + ' was deleted');

        this.setState({cards: cards}, function () {
            this.updateList();
        });
    },

    handleMoveCard: function (direction, index) {
        var cards = this.state.cards.splice(0);

        switch (direction) {
            case 'up':
                if (index > 0) {
                    var temp = cards[index];
                    cards[index] = cards[index - 1];
                    cards[index - 1] = temp;
                } else {
                    // error
                    this.props.postSnack('Card ' + cards[index] + ' is already at the top');
                }
                break;
            case 'down':
                if (index < cards.length - 1) {
                    var temp = cards[index];
                    cards[index] = cards[index + 1];
                    cards[index + 1] = temp;
                } else {
                    // error
                    this.props.postSnack('Card ' + cards[index] + ' is already at the bottom');
                }
                break;
            case 'right':
                //this.props.moveCard(1, this.props.id, index);
                break;
            case 'left':
                //this.props.moveCard(-1, this.props.id, index);
                break;
        }

        this.setState({cards: cards}, function () {
            this.updateList();
        });
    },

    handleMoveRight: function (e) {
        this.props.moveList(1, this.props.id);
    },

    handleMoveLeft: function (e) {
        this.props.moveList(-1, this.props.id);
    },

    render: function () {
        var name = this.state.name;
        var cards = [];
        if (this.state.cards) {
            cards = this.state.cards.map( function(card, index) {
              return ( <TrelloCard
                  key={index}
                  id={index}
                  card={card}
                  onCardChange={this.handleCardChange}
                  onUpdateCard={this.updateList}
                  onDeleteCard={this.handleDeleteCard}
                  onMoveCard={this.handleMoveCard}
                  /> );
            }, this);
        }

        return (
            <Paper className='list' zDepth={2} >
                <TextField
                  id='temp'
                  value={name}
                  hintText='List Name'
                  errorText={this.state.nameErrorText}
                  onChange={this.handleNameChange}
                  onBlur={this.handleListNameChange}
                />
                <br/>
                <IconButton onTouchTap={this.handleMoveLeft} >
                    <NavigationLeft />
                </IconButton>
                <IconButton onTouchTap={this.handleMoveRight} >
                    <NavigationRight />
                </IconButton>
                <IconButton onTouchTap={this.handleDeleteList} >
                    <ActionDelete />
                </IconButton>
                <Paper className='card' zDepth={1} >
                    {cards}
                    <TextField
                      id='New Card'
                      value={this.state.newCard}
                      hintText='Add a Card...'
                      multiLine={true}
                      rowsMax={4}
                      onBlur={this.handleAddCard}
                      onChange={this.handleNewCardChange}
                    />
                </Paper>
            </Paper>
        );
    }
});

module.exports = TrelloList;
