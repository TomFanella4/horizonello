
var loadAllLists = function (thisVar) {
    $.ajax({
        url: '/api/lists',
        dataType: 'json',
        cache: false,
        success: function(data) {
          this.setState({lists: data.rows});
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

module.exports = [];
module.exports.loadAllLists = loadAllLists;
module.exports.addNewList = addNewList;
