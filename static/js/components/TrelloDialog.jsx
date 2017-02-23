import React from 'react';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

var TrelloDialog = React.createClass({
    getInitialState: function () {
        return {
            open: false,
            listName: ''
        };
    },

    handleOpen: function () {
        this.setState({open: true});
    },

    handleClose: function () {
        this.setState({open: false, listName: ''});
    },

    handleSubmit: function () {
        this.setState({open: false});

        this.props.addNewList(this.state.listName);

        this.setState({listName: ''});
    },

    handleNameChange: function (e) {
        this.setState({listName: e.target.value});
    },

    render: function () {
        const actions = [
          <FlatButton
            label="Cancel"
            primary={true}
            onTouchTap={this.handleClose}
          />,
          <FlatButton
            label="Submit"
            primary={true}
            onTouchTap={this.handleSubmit}
          />,
        ];

        return (
          <div>
            <FloatingActionButton
              className='fab'
              onTouchTap={this.handleOpen}
            >
              <ContentAdd />
            </FloatingActionButton>
            <Dialog
              title="Add New List"
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
            >
              <TextField
                id='newName'
                floatingLabelText="Name of your List"
                value={this.state.listName}
                autoFocus
                onChange={this.handleNameChange}
              />
            </Dialog>
          </div>
        );
    }
});

module.exports = TrelloDialog;
