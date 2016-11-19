var guid = require('./guid').guid;

function createEntry() {
  var uuid       = guid();
  var dataObject = {uuid : uuid};

  if (localStorage.getItem('refID')) {
    dataObject.returningSession = 'true';
  }

  $.ajax({
    type        : "POST",
    url         : "/api/session/",
    data        : JSON.stringify(dataObject),
    dataType    : 'json',
    contentType : 'application/json',
    success     : function (res) {
      console.log(res.id);
      localStorage.setItem('refID', res.id);
      let startTime = new Date().getTime();
      localStorage.setItem('startTime', startTime);
    },
  });
}

module.exports = {
  createEntry : createEntry
};