function updateEntry(dataObject) {
  var id                   = localStorage.getItem('refID');
  var url                  = "/api/session/" + id;
  var start                = localStorage.getItem('startTime');
  var end                  = new Date().getTime();
  dataObject.sessionLength = end - start;
  if (id) {
    $.ajax({
      type        : "PUT",
      url         : url,
      data        : JSON.stringify(dataObject),
      dataType    : 'json',
      contentType : 'application/json',
      success     : function (res) {
        console.log(res.id);
      },
    });
  }
}

module.exports = {
  updateEntry : updateEntry
};