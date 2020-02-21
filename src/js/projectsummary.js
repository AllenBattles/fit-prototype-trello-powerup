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
        var id = "217062.21.001";
        var desc = card.desc;
        if (desc && desc.length > 0)
            id = desc;

        fetch(`${API_BASE}?id=${id}`)
        .then(function(response) {
            return response.json();
        }).then(function(j) {
            
            var data = JSON.stringify(j);
            if (j != null){
                document.getElementById('project_summary_content').innerHTML  = data;

                document.getElementById('TotalComp').innerHTML  = j.TotalComp.toString();

                document.getElementById('JTD_Total').innerHTML  = j.JTD_Total.toString();                
                document.getElementById('EAC_Total').innerHTML  = j.EAC_Total.toString();
                document.getElementById('Base_Total').innerHTML  = j.Base_Total.toString();
                document.getElementById('GrossVar').innerHTML  = j.GrossVar.toString();
             
                document.getElementById('JTD_Net').innerHTML  = j.JTD_Net.toString();
                document.getElementById('EAC_Net').innerHTML  = j.EAC_Net.toString();
                document.getElementById('Base_Net').innerHTML  = j.Base_Net.toString();
                document.getElementById('NetVar').innerHTML  = j.NetVar.toString();
                
                document.getElementById('JTD_GM').innerHTML  = j.JTD_GM.toString();
                document.getElementById('EAC_GM').innerHTML  = j.EAC_GM.toString();
                document.getElementById('Base_GM').innerHTML  = j.Base_GM.toString();
                document.getElementById('GMVar').innerHTML  = j.GMVar.toString();

                document.getElementById('JTD_GMPct').innerHTML  = j.JTD_GMPct.toString();
                document.getElementById('EAC_GMPct').innerHTML  = j.EAC_GMPct.toString();
                document.getElementById('Base_GMPct').innerHTML  = j.Base_GMPct.toString();
                document.getElementById('GMPctVar').innerHTML  = j.GMPctVar.toString();

                document.getElementById('JTD_Mult').innerHTML  = j.JTD_Mult.toString();
                document.getElementById('EAC_Mult').innerHTML  = j.EAC_Mult.toString();
                document.getElementById('Base_Mult').innerHTML  = j.Base_Mult.toString();
                document.getElementById('MultVar').innerHTML  = j.MultVar.toString();            

            }


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