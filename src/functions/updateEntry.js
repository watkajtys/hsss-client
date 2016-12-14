function updateEntry(dataObject) {
  let id                   = localStorage.getItem('refID');
  let url                  = "/api/session/" + id;
  let start                = localStorage.getItem('startTime');
  let end                  = new Date().getTime();
  dataObject.sessionLength = end - start;

  //IF THIS IS A TOGGLE UPDATE, ATTACH THE CURRENT SESSION LENGTH
  if (dataObject.firstToggle) {
    dataObject.firstToggledTime = dataObject.sessionLength;
    //REMOVING THE FIRST TOGGLE BOOL AS WE DON'T NEED IT
    delete dataObject.firstToggle;
  }

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