var React = require('react');
import TrelloCard from './TrelloCard.jsx';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

var TrelloList = React.createClass({
    getInitialState: function () {
        return {
            name: this.props.name,
            cards: this.props.cards
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

    handleAddCard: function (e) {

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
                  /> );
            }, this);
        }

        return (
            <Paper className='list' zDepth={2} >
                <TextField
                  id='temp'
                  value={name}
                  onChange={this.handleNameChange}
                />
                <Paper className='card' zDepth={1} >
                    {cards}
                    <TextField
                      id='New Card'
                      hintText='Add a Card...'
                      multiLine={true}
                      rowsMax={4}
                      onChange={this.addNewCard}
                    />
                </Paper>
            </Paper>
        );
    }
});

module.exports = TrelloList;
