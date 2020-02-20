//var t = window.TrelloPowerUp.iframe();
var t = TrelloPowerUp.iframe();

t.render(function(){
  // make sure your rendering logic lives here, since we will
  // recall this method as the user adds and removes attachments
  // from your section

  t.card('all')
  .then(function (card) {
    console.log(JSON.stringify(card, null, 2));
  });

//   t.getAll()
//   .then(function(card){
//       console.log(card);
//     document.getElementById('project_summary_content').innerHTML  = "CARD ID = "  + card.idShort;
//   });
});