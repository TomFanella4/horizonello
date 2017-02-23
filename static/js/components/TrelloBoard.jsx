import React from 'react';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import Snackbar from 'material-ui/Snackbar';

import TrelloList from './TrelloList.jsx';
import TrelloDialog from './TrelloDialog.jsx';
import WebService from '../WebService.js';

injectTapEventPlugin();

var TrelloBoard = React.createClass({
    getInitialState: function () {
        return {
            lists: [],
            snackOpen: false,
            snackMessage: ''
        };
    },

    postSnack: function (message) {
        this.setState({
            snackMessage: message,
            snackOpen: true
        });
    },

    handleSnackRequestClose: function () {
        this.setState({
            snackMessage: '',
            snackOpen: false
        });
    },

    getNextPos: function () {
        var lists = this.state.lists;
        var pos = 0;
        lists.forEach(function (list) {
            if (list.pos > pos) {
                pos = list.pos;
            }
        });
        return ++pos;
    },

    loadListsFromServer: function () {
        WebService.loadAllLists(this);
    },

    addNewList: function (name) {
        if (name != '') {
            var pos = this.getNextPos();
            WebService.addNewList(name, pos, this);
        } else {
            // Add Snackbar notification here
            console.error('Invalid name');
        }
    },

    moveList: function (direction, id) {
        var lists = this.state.lists;
        for (var i = 0; i < lists.length; i++) {
            if (lists[i].id == id) {
                if (i + direction < 0 && direction == -1) {
                    this.postSnack('List ' + lists[i].name + ' is already at the beginning');
                    return;
                }
                if (i + direction >= lists.length && direction == 1) {
                    this.postSnack('List ' + lists[i].name + ' is already at the end');
                    return;
                }
                var list1 = lists[i];
                var list2 = lists[i + direction];

                WebService.updateList(list1.id, list1.name, list2.pos, list1.cards, this);
                WebService.updateList(list2.id, list2.name, list1.pos, list2.cards, this);
            }
        }
    },

    moveCard: function (direction, id, cardIndex) {
        var lists = this.state.lists;
        for (var i = 0; i < lists.length; i++) {
            if (lists[i].id == id && i + direction >= 0 && i + direction < lists.length) {
                var list1 = lists[i];
                var list2 = lists[i + direction];
                console.log(list1);
                console.log(list2);
                var cards1 = list1.cards.slice(0);
                var card = cards1[cardIndex];
                cards1.splice(cardIndex, 1);

                var cards2;
                if (list2.cards) {
                    cards2 = list2.cards.slice(0);
                    cards2.push(card);
                } else {
                    console.log('add');
                    cards2 = [card];
                }

                console.log(card);

                console.log(cards1);
                console.log(cards2);

                WebService.updateList(list1.id, list1.name, list1.pos, cards1, this);
                WebService.updateList(list2.id, list2.name, list2.pos, cards2, this);
            }
        }
    },

    componentDidMount: function () {
        this.loadListsFromServer();
    },

    render: function () {
        console.log(this.state.lists);
        var lists = this.state.lists.map( function(list) {
          return (
              <TrelloList
                  key={list.id}
                  id={list.id}
                  name={list.name}
                  pos={list.pos}
                  cards={list.cards}
                  parentContext={this}
                  moveList={this.moveList}
                  moveCard={this.moveCard}
                  postSnack={this.postSnack}
              />
          );
      }.bind(this));

        return (
            <MuiThemeProvider>
                <div>
                    <AppBar
                        title='Horizonello'
                        showMenuIconButton={false}
                    />
                    {lists}
                    <TrelloDialog
                        addNewList={this.addNewList}
                        postSnack={this.postSnack}
                    />
                    <Snackbar
                      open={this.state.snackOpen}
                      message={this.state.snackMessage}
                      autoHideDuration={4000}
                      onRequestClose={this.handleSnackRequestClose}
                    />
                </div>
            </MuiThemeProvider>
        );
    }
});

module.exports = TrelloBoard;
