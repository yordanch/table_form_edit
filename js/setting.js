function quitarComa(el, expresion, remplazar){
    el.value = el.value.replace(/,/g, remplazar);
}
function onlyAcceptNumber(el){
    // Get input value
    var inputVal = $(el).val();

    // Define regular expression
    var regex = /^\d*[.]?\d*$/;
    
    // Test input value against regular expression
    if(regex.test(inputVal)){
        $(el).removeClass("error").addClass("success");
    } else{
        $(el).removeClass("success").addClass("error");
    }
}