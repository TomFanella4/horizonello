
var loadAllLists = function (thisVar) {
    $.ajax({
        url: '/api/lists',
        dataType: 'json',
        cache: false,
        success: function(data) {
          var lists = _.sortBy(data.rows, 'pos');
          this.setState({lists: lists});
        }.bind(thisVar),
        error: function(xhr, status, err) {
          console.error('/api/lists', status, err.toString());
        }.bind(thisVar)
  });
}

var addNewList = function (name, pos, thisVar) {
    $.ajax({
        url: '/api/lists',
        dataType: 'json',
        type: 'POST',
        data: {
            name: name,
            pos: pos
        },
        cache: false,
        success: function(data) {
          this.loadListsFromServer();
        }.bind(thisVar),
        error: function(xhr, status, err) {
          console.error('/api/lists', status, err.toString());
        }.bind(thisVar)
    });
}

var updateList = function (id, name, pos, cards, thisVar) {
    $.ajax({
        url: '/api/lists/' + id,
        dataType: 'json',
        type: 'POST',
        data: {
            name: name,
            pos: pos,
            cards: cards
        },
        cache: false,
        success: function(data) {
          this.loadListsFromServer();
        }.bind(thisVar),
        error: function(xhr, status, err) {
          console.error('/api/lists', status, err.toString());
        }.bind(thisVar)
    });
}

var deleteList = function (id, thisVar) {
    $.ajax({
        url: '/api/lists/' + id,
        dataType: 'json',
        type: 'DELETE',
        cache: false,
        success: function(data) {
          this.loadListsFromServer();
        }.bind(thisVar),
        error: function(xhr, status, err) {
          console.error('/api/lists', status, err.toString());
        }.bind(thisVar)
    });
}

module.exports = [];
module.exports.loadAllLists = loadAllLists;
module.exports.addNewList = addNewList;
module.exports.updateList = updateList;
module.exports.deleteList = deleteList;
