var React = require('react');

var injectTapEventPlugin = require('react-tap-event-plugin');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';

import TrelloList from './TrelloList.jsx';
import TrelloDialog from './TrelloDialog.jsx';
import WebService from '../WebService.js';

injectTapEventPlugin();

var TrelloBoard = React.createClass({
    getInitialState: function () {
        return {
            lists: []
        };
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
                    <TrelloDialog addNewList={this.addNewList}/>
                </div>
            </MuiThemeProvider>
        );
    }
});

module.exports = TrelloBoard;
