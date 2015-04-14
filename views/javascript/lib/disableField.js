$(document).ready(function(){
    $('#securityNeeded').change(function () {
        selection = $('#securityNeeded').val();
        console.log(selection);
        switch (selection) {
            case '1':
                $('#securityQty').prop("disabled", false);
                break;
            case '0':
                $('#securityQty').prop("disabled", true);
                $('#securityQty').val(0);
                break;
            default :
                $('#securityQty').prop("disabled", true);
        }
    });
});