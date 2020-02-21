//var t = window.TrelloPowerUp.iframe();
var t = TrelloPowerUp.iframe();
const API_BASE = 'https://glp2.csrsinc.com/api/dashboard/projectsummary';

t.render(function(){
  // make sure your rendering logic lives here, since we will
  // recall this method as the user adds and removes attachments
  // from your section

  t.card('all')
  .then(function (card) {
    console.log(JSON.stringify(card, null, 2));
    if (card){
        document.getElementById('project_summary_content').innerHTML  = "CARD NAME = "  + card.name;


        fetch(`${API_BASE}?id=217062.21.001`)
        .then(function(response) {
          console.log(response); 
        }).catch(function(error) {  
          console.log('Request failed', error)  
        });

        // fetch(`${API_BASE}?id=217062.21.001`)
        // .then(response => {
        //   if (response){

        //   }
        // });


    }
  });

//   t.getAll()
//   .then(function(card){
//       console.log(card);
//     document.getElementById('project_summary_content').innerHTML  = "CARD ID = "  + card.idShort;
//   });
});