$(document).ready(function () {
    $("#jsonForm").submit(function () {
        var json = $("#jsonTextArea").val();
        var model = JSON.parse(json);
        $.ajax({
            type: "POST",
            url: apiUrl + 'Admin/AddLogRecord',
            datatype: "jsonp",
            data: model,
            error: function(jqXHR, textStatus, errorThrown){
                alert("Obiekt zapisany");
                $("#jsonTextArea").val('');
            }
        });

        return false;
    });
});