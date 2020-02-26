//var t = window.TrelloPowerUp.iframe();
var t = TrelloPowerUp.iframe();
const API_BASE = 'https://fwittrello.csrsinc.com/api/dashboard/projectsummary';
//const API_BASE = 'https://glp2.csrsinc.com/api/dashboard/projectsummary';

var formatCurrency = function (val) {

    var rtnVal = '';

    var pureVal = val;
    if (pureVal < 0) {
        pureVal = Math.abs(pureVal);
    }

    rtnVal = pureVal.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    if (val < 0) {
        rtnVal = "(" + rtnVal + ")";
    }

    return rtnVal;
};

var formatPercent = function (val, useNegativeSign) {

    var rtnVal = '';

    var pureVal = val / 100.0000;
    if (pureVal < 0) {
        pureVal = Math.abs(pureVal);
    }

    rtnVal = pureVal.toLocaleString('en-US', {
        style: 'percent',
        currency: 'USD',
    });

    if (val < 0) {
        if (useNegativeSign) {
            rtnVal = "-" + rtnVal;
        } else {
            rtnVal = "(" + rtnVal + ")";
        }
    }

    return rtnVal;

};

var formatDecimal = function (val) {
    return val.toLocaleString('en-US', {
        style: 'decimal',
        minimumFractionDigits: 2,
        currency: 'USD',
    });
};

t.render(function () {
    // make sure your rendering logic lives here, since we will
    // recall this method as the user adds and removes attachments
    // from your section

    var customFieldID = 'NA';
    var boardName = '';
    var isTestBoard = false;

    t.get('board', 'shared')
        .then(function (board) {
            //console.log(JSON.stringify(board, null, 2));

            if (board && board.projectsummary) {
                customFieldID = board.projectsummary;
            }

            return t.board('id', 'name');

        }).then(function (brd) {

            if (brd) {
                boardName = brd.name;
            }

            return t.card('all');
        }).then(function (card) {

            //console.log(JSON.stringify(card, null, 2));

            if (card) {

                var id = "NA";
                var desc = card.desc;
                if (desc && desc.length > 0)
                    id = desc;

                //get project number from custom field
                if (card.customFieldItems && card.customFieldItems.length > 0) {
                    for (var i = 0; i < card.customFieldItems.length; i++) {
                        if (card.customFieldItems[i].idCustomField === customFieldID) {
                            if (card.customFieldItems[i].value) {
                                id = card.customFieldItems[i].value.text;
                                break;
                            }
                        }
                    }
                }

                //console.log("boardName = " + boardName);

                let apiUrl = `${API_BASE}?id=${id}`;
                if (boardName && boardName.toLowerCase().indexOf('test') >= 0) {
                    isTestBoard = true;
                    apiUrl = 'https://glp2.csrsinc.com/api/dashboard/projectsummary?id=' + id;
                }

                //console.log("apiUrl = " + apiUrl);

                fetch(apiUrl)
                    .then(function (response) {
                        return response.json();
                    }).then(function (j) {
                        //var data = JSON.stringify(j);
                        if (j != null) {

                            try {
                                document.getElementById('TotalComp').innerHTML = formatCurrency(j.TotalComp);

                                document.getElementById('JTD_Total').innerHTML = formatCurrency(j.JTD_Total);
                                document.getElementById('EAC_Total').innerHTML = formatCurrency(j.EAC_Total);
                                document.getElementById('Base_Total').innerHTML = formatCurrency(j.Base_Total);
                                document.getElementById('GrossVar').innerHTML = formatCurrency(j.GrossVar);

                                document.getElementById('JTD_Net').innerHTML = formatCurrency(j.JTD_Net);
                                document.getElementById('EAC_Net').innerHTML = formatCurrency(j.EAC_Net);
                                document.getElementById('Base_Net').innerHTML = formatCurrency(j.Base_Net);
                                document.getElementById('NetVar').innerHTML = formatCurrency(j.NetVar);

                                document.getElementById('JTD_GM').innerHTML = formatCurrency(j.JTD_GM);
                                document.getElementById('EAC_GM').innerHTML = formatCurrency(j.EAC_GM);
                                document.getElementById('Base_GM').innerHTML = formatCurrency(j.Base_GM);
                                document.getElementById('GMVar').innerHTML = formatCurrency(j.GMVar);

                                document.getElementById('JTD_GMPct').innerHTML = formatPercent(j.JTD_GMPct, false);
                                document.getElementById('EAC_GMPct').innerHTML = formatPercent(j.EAC_GMPct, false);
                                document.getElementById('Base_GMPct').innerHTML = formatPercent(j.Base_GMPct, false);
                                document.getElementById('GMPctVar').innerHTML = formatPercent(j.GMPctVar, false);

                                document.getElementById('JTD_Mult').innerHTML = formatDecimal(j.JTD_Mult);
                                document.getElementById('EAC_Mult').innerHTML = formatDecimal(j.EAC_Mult);
                                document.getElementById('Base_Mult').innerHTML = formatDecimal(j.Base_Mult);
                                document.getElementById('MultVar').innerHTML = formatDecimal(j.MultVar);

                                document.getElementById('Client').innerHTML = "Client: " + j.Client;
                                document.getElementById('ProjectManager').innerHTML = j.ProjectManager;

                                document.getElementById('Owner').innerHTML = "Owner: " + j.Owner;
                                document.getElementById('OwnerManager').innerHTML = j.OwnerManager;

                                if (isTestBoard){
                                    document.getElementById('TotalAR').innerHTML = "AR: " + formatCurrency(j.TotalAR);
                                    document.getElementById('ARPlus60').innerHTML = "AR > 60: " + formatCurrency(j.ARPlus60);
    
                                    document.getElementById('DraftAmount').innerHTML = "Draft Invoice Amount: " + formatCurrency(j.DraftAmount);
                                    document.getElementById('InvoiceStatus').innerHTML = "Invoice Status: " + j.InvoiceStatus;
    
                                    document.getElementById('Status').innerHTML = "Project Status: " + j.Status;
                                }


                            } catch (err) {
                                console.log('Binding HTML Failed', err);
                            }

                        }


                    }).catch(function (error) {
                        console.log('Request failed', error)
                    });

            }
        });





    //   t.getAll()
    //   .then(function(card){
    //       console.log(card);
    //     document.getElementById('project_summary_content').innerHTML  = "CARD ID = "  + card.idShort;
    //   });
});