var React = require('react');

import TrelloCard from './TrelloCard.jsx';
import WebService from '../WebService.js';

import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

var TrelloList = React.createClass({
    getInitialState: function () {
        return {
            name: this.props.name,
            cards: this.props.cards,
            newCard: ''
        };
    },

    handleNameChange: function (e) {
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
        var name = this.state.name;
        var cards = this.state.cards;
        var pos = this.props.pos;
        var parentContext = this.props.parentContext;

        WebService.updateList(id, name, pos, cards, parentContext);
    },

    handleListNameChange: function (e) {
        if (e.target.value != this.props.name) {
            this.updateList();
        }
    },

    handleDeleteList: function (e) {
        var id = this.props.id;
        var parentContext = this.props.parentContext;

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
    },

    handleDeleteCard: function (id) {
        var cards = this.state.cards.slice(0);
        cards.splice(id, 1);

        this.setState({cards: cards}, function () {
            this.updateList();
        });
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
                  /> );
            }, this);
        }

        return (
            <Paper className='list' zDepth={2} >
                <TextField
                  id='temp'
                  value={name}
                  onChange={this.handleNameChange}
                  onBlur={this.handleListNameChange}
                />
                <FlatButton
                  label='X'
                  onTouchTap={this.handleDeleteList}
                />
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
