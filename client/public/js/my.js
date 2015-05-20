var MSG_TYPE = {
    ERROR : 'ERROR',
    SUCCESS : 'SUCCESS'
}
$(document).ready(function() {
    hideDivs();

    $( "#add" ).click(function() {
        cloneRow();
    });
    $( "#createLocketFile" ).click(function() {
        postUrls();
    });
    $('#reset').click(function() {
        reset();
        hideDivs();
    });
});
function cloneRow() {
    if(isAnyEmptyUrl() == false) {
        var newRow = $('#firstRow').clone();
        newRow.find('textarea').val('');
        $('#urlAdd').append(newRow.removeAttr('id').addClass('secondary'));
        newRow = null;
    }
}
function getUrls() {
    var urlSet = [];
    $('.urlInputSet').each(function (){
        var url = $(this).val().trim();
        if(url.length != 0) {
            urlSet.push(url);
        }
    });
    return urlSet;
}

function postUrls() {
    var urlSet = getUrls();
    if(urlSet.length > 0) {
        $.ajax({
            type: "POST",
            url: "/create-locker",
            data: JSON.stringify({"urlSet":urlSet}),
            contentType: "application/json",
            dataType: "json",
            success: function(data){
                setMessage(MSG_TYPE.SUCCESS, data);
                reset();
            },
            error:  function(xhr, errorType, exception) {
                setMessage(MSG_TYPE.ERROR, xhr.responseText);
            }
        });
    } else {
        alert('Please enter at least single url . . !');
    }
}

function reset() {
    $('.secondary').remove();
    $('.urlInputSet').val('');

}

function hideDivs() {
    $('#successRow').hide();
    $('#qrCode').hide();
    $('#errorRow').hide();
    $('#qrCodeContent').html('');
}

function isAnyEmptyUrl() {
    var isAnyEmpty = false;
    $('.urlInputSet').each(function () {
       if($(this).val().trim().length == 0) {
           isAnyEmpty =  true;
       }
    });
    return isAnyEmpty;
}

function setMessage(type, data) {
    switch(type) {
        case MSG_TYPE.SUCCESS:
            $("#inputSuccessLockerCreatedIp").val(data.lockerPasscode);
            $("#inputErrorLockerCreatedIp").val('');
            $("#qrCodeContent").val('');
            var qrCode = new QRCode(document.getElementById('qrCodeContent'), data.lockerPasscode);

            $('#successRow').show();
            $('#qrCode').show();
            $('#errorRow').hide();
            break;
        case MSG_TYPE.ERROR:
            $("#inputSuccessLockerCreatedIp").val('');
            $("#inputErrorLockerCreatedIp").val(data);

            $('#successRow').hide();
            $('#qrCode').hide();
            $('#errorRow').show();
            break;
    }
}