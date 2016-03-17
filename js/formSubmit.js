$(document).ready(function () {
    var logTimeInput = $("#logTime");
    var logIdentiferInput = $("#logIdentifer");
    var dateTime = new Date();
    logTimeInput.val(dateTime.toJSON());
    logIdentiferInput.val(myip);
    
    var max_fields = 100; //maximum input boxes allowed
    var wrapper = $(".inputFieldsWrap"); //Fields wrapper
    var add_button = $("#addFieldButton"); //Add button ID

    var x = 0; //initlal text box count
    $(add_button).click(function (e) { //on add input button click
        e.preventDefault();
        if (x < max_fields) { //max input box allowed
            x++; //text box increment
            $(wrapper).append('<div class="row"> <div class="col-md-6"> <input type="text" class="form-control marginBottom" required=""/> </div> <div class="col-md-6"> <div class="row"> <div class="col-md-11"> <input type="text" class="form-control marginBottom" required=""/> </div> <div class="col-md-1"> <a href="#" class="removeField"><span class="glyphicon glyphicon-remove blackGlyph" aria-hidden="true"></span></a> </div> </div> </div> </div>'); //add input box
        }
    });

    $(wrapper).on("click", ".removeField", function (e) { //user click on remove text
        e.preventDefault(); $(this).parent('div').parent('div').parent('div').parent('div').remove(); x--;
    });

    //submit form
    $("#headersForm").submit(function () {
        $("#alertsWrapper").children().remove();
        var model = new Object();
        model.Headers = new Array();
        model.Headers.push('Czas zdarzenia');
        model.Headers.push('Identyfikator źródła zdarzenia');
        model.Records = new Array();
        model.Records.push(new Array());
        model.Records[0].push(logTimeInput.val());
        model.Records[0].push(logIdentiferInput.val());
        var headersInputs = $("div > div > input", ".inputFieldsWrap");
        var headersCount = headersInputs.length;
        if(headersCount !== 0){
            for (var i = 0; i <= headersCount / 2; i += 2) {
                model.Headers.push($(headersInputs[i]).val());
                model.Records[0].push($(headersInputs[i + 1]).val());
            }
        }

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

        return false; // avoid to execute the actual submit of the form.
    });
});