/**
 * Created by ruwang on 5/7/15.
 */
$(document).ready(function() {
    $('#errorRow').hide();
    $('#successRow').hide();
    $( "#go" ).click(function() {
        executeDownLoad();
    });
});

function executeDownLoad() {
    $('#errorRow').hide();
    $('#inputError').val('');
    var passCode = $('#passCodeTxt').val().trim();

    if(passCode.length > 0) {
        $.ajax({
            type: "GET",
            url: '/get-secret-file-status/' + passCode,
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                $('#successRow').show();
                $('#passCodeTxt').val('');
                makePost('/get-secret-file', passCode);
            },
            error: function (xhr, errorType, exception) {
                $('#errorRow').show();
                $('#successRow').hide();
                $('#inputError').val(xhr.responseText);
            }
        });

    } else {
        $('#errorRow').show();
        $('#successRow').hide();
        $('#inputError').val('Please provide the 32 character pass code');
    }
}

function makePost(url, passcode) {
    // Build a form
    var form = $('<form></form>').attr('action', url).attr('method', 'post');
    // Add the one key/value
    form.append($("<input></input>").attr('type', 'hidden').attr('name', 'tmp').attr('value', JSON.stringify({"passcode":passcode})));
    //send request
    form.appendTo('body').submit().remove();
    setTimeout(function(){ $('#successRow').hide(); }, 5000);
}