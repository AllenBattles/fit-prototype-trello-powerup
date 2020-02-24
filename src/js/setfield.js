var t = TrelloPowerUp.iframe();

window.estimate.addEventListener('submit', function (event) {
    // Stop the browser trying to submit the form itself.
    event.preventDefault();
    return t.set('card', 'shared', 'projectsummary', window.customFieldSel.value)
        .then(function () {
            t.closePopup();
        });
});

t.render(function () {

    t.board('id', 'customFields')
        .then(function (board) {

            console.log(board);

            if (board) {

                if (board.customFields && board.customFields.length > 0) {
                    var custFieldSel = document.getElementById("customFieldSel");

                    for (let i = 0; i < board.customFields.length; i++) {
                        const custField = board.customFields[i];
                        var option = document.createElement("option");
                        option.text = custFieldSel.text;
                        option.value = custFieldSel.id;
                        x.add(option)
                    }
                }
            }

        }).then(function () {
            t.sizeTo('#customFieldSel').done();
        });

});