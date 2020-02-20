var t = window.TrelloPowerUp.iframe();

// you can access arguments passed to your iframe like so
var arg = t.arg('arg');

t.render(function(){
  // make sure your rendering logic lives here, since we will
  // recall this method as the user adds and removes attachments
  // from your section
  t.get('card')
  .then(function(card){
    document.getElementById('project_summary_content').textContent = "CARD ID = "  + card.idShort;
  });
});