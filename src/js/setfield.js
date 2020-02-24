var t = TrelloPowerUp.iframe();

window.setfield.addEventListener('submit', function (event) {
    // Stop the browser trying to submit the form itself.
    event.preventDefault();
    return t.set('board', 'shared', 'projectsummary', window.customFieldSel.value)
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
                        var option = document.createElement("option");
                        option.text = board.customFields[i].name;
                        option.value = board.customFields[i].id;
                        custFieldSel.add(option)
                    }
                }
            }

        }).then(function () {
            t.sizeTo(document.body).done();
        });

});
