//var t = window.TrelloPowerUp.iframe();
var t = TrelloPowerUp.iframe();
const API_BASE = 'https://fwittrello.csrsinc.com/api/dashboard/modernprojectsummary';
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
        minimumFractionDigits: 0,
        maximumFractionDigits: 0        
    });

    if (val < 0) {
        rtnVal = "(" + rtnVal + ")";
    }

    return rtnVal;
};

var formatDateToShortDate = function(val) {

    var rtnVal = '';

    if (val != null){
        var d = new Date(val);
        rtnVal = d.toLocaleDateString();        
        console.log(rtnVal);
    }

    return rtnVal;
};

var formatPercent = function (val, useNegativeSign) {

    var rtnVal = '';

    var pureVal = val; // / 100.0000;
    if (pureVal < 0) {
        pureVal = Math.abs(pureVal);
    }

    rtnVal = pureVal.toLocaleString('en-US', {
        style: 'percent',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,        
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
var formatDecimalNoPoints = function (val) {
    return val.toLocaleString('en-US', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
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
                    apiUrl = 'https://glp2.csrsinc.com/api/dashboard/modernprojectsummary?id=' + id;
                }

                //console.log("apiUrl = " + apiUrl);

                fetch(apiUrl)
                    .then(function (response) {
                        return response.json();
                    }).then(function (j) {
                        //var data = JSON.stringify(j);
                        if (j != null) {

                            try {
                                document.getElementById('TotalComp').innerHTML = "Total Comp: " + formatCurrency(j.BaselineGross);

                                document.getElementById('baseline_gross').innerHTML = formatCurrency(j.BaselineGross);
                                document.getElementById('jtd_gross').innerHTML = formatCurrency(j.JTDGross);
                                document.getElementById('effort_enddate').innerHTML = formatDateToShortDate(j.BaselineEndDate);
                                //document.getElementById('effort_enddate').innerHTML = j.BaselineEndDate;
                                
                                document.getElementById('baseline_net').innerHTML = formatCurrency(j.BaselineNet);
                                document.getElementById('jtd_net').innerHTML = formatCurrency(j.JTDNet);
                                document.getElementById('effort_remaining').innerHTML = formatDecimalNoPoints(j.EffortUnassigned);

                                document.getElementById('baseline_gm').innerHTML = formatCurrency(j.BaselineMargin);
                                document.getElementById('jtd_gm').innerHTML = formatCurrency(j.JTDMargin);
                                document.getElementById('effort_excess').innerHTML = formatDecimalNoPoints(j.EffortExcess);                                

                                document.getElementById('baseline_gmpct').innerHTML = formatPercent(j.BaselineGM, false);
                                document.getElementById('jtd_gmpct').innerHTML = formatPercent(j.JTDGM, false);
                                document.getElementById('effort_gmpct').innerHTML = formatPercent(j.EffortGM, false);
                                //document.getElementById('GMPctVar').innerHTML = formatPercent(j.GMPctVar, false);

                                document.getElementById('baseline_mult').innerHTML = formatDecimal(j.BaselineMultiplier);
                                document.getElementById('jtd_mult').innerHTML = formatDecimal(j.JTDMultiplier);
                                //document.getElementById('effort_mult').innerHTML = formatDecimal(j.BaselineGM);                               

                                document.getElementById('Client').innerHTML = "Client: " + j.ClientName;
                                document.getElementById('ProjectManager').innerHTML = j.ProjectManager;

                                document.getElementById('Owner').innerHTML = "Owner: " + j.OwnerName;
                                document.getElementById('OwnerManager').innerHTML = ""; //j.OwnerManager;

                                document.getElementById('TotalAR').innerHTML = "AR: " + formatCurrency(j.ARTotal);
                                document.getElementById('ARPlus60').innerHTML = "AR > 60: " + formatCurrency(j.AROverAmount);

                                //document.getElementById('DraftAmount').innerHTML = "Draft Invoice Amount: " + formatCurrency(j.DraftAmount);
                                //document.getElementById('InvoiceStatus').innerHTML = "Invoice Status: " + j.InvoiceStatus;

                                document.getElementById('Status').innerHTML = "Project Status: " + j.Status;
                                //document.getElementById('ITR').innerHTML = "ITR: " + j.ITR;
                                document.getElementById('LeadEngineer').innerHTML = "Lead Engineer: " + j.LeadEngineer;

                                document.getElementById('unbilled_total').innerHTML = "Unbilled Total: " + formatCurrency(j.UnbilledTotal);
                                document.getElementById('unbilled_aged').innerHTML = "Unbilled Aged: " + formatCurrency(j.UnbilledAged);                                


                            } catch (err) {
                                console.log('Binding HTML Failed', err);
                            }

                        }


                        t.sizeTo(document.body).done();

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