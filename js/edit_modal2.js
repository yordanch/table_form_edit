// requiere (test in this versions)
// sweetalert2
// Bootstrap5.0.0
// fontAwesome5.15.3
// jquery-3.6.0.min.js

// definition
function createModal(opt = {}){
    opt.idModal = opt.idModal==undefined?"asdfg":opt.idModal;
    opt.title = opt.title==undefined?"Titulo de modal":opt.title;
    opt.buttonClose = opt.buttonClose==undefined?false:opt.buttonClose;
    opt.buttonCloseText = opt.buttonCloseText==undefined?"Cerrar":opt.buttonCloseText;
    opt.buttonAction = opt.buttonAction==undefined?()=>{}:opt.buttonAction;
    opt.buttonSaveText = opt.buttonSaveText==undefined?"Guardar":opt.buttonSaveText;
    opt.buttonSaveClass = opt.buttonSaveClass==undefined?"btn btn-primary":opt.buttonSaveClass;
    opt.margin = opt.margin==undefined?"m-0":opt.margin;

    opt.input = opt.input==undefined?{}:opt.input;
    opt.upper = opt.upper==undefined?false:opt.upper;
    opt.lower = opt.lower==undefined?false:opt.lower;
    //remove
    $(".modaldelete_custom").remove();

    var modal = '<div class="modal fade" tabindex="-1" aria-hidden="true" id="'+opt.idModal+'">'+
        '<div class="modal-dialog">'+
            '<div class="modal-content">'+
                '<div class="modal-header">'+
                    '<h5 class="modal-title">'+opt.title+'</h5>'+
                    '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>'+
                '</div>'+
                '<div class="modal-body">'+
                    createInput(opt.input, opt)+//'<p>Modal body text goes here.</p>'
                '</div>'+
                '<div class="modal-footer">'+
                (opt.buttonClose==true?'<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">'+opt.buttonCloseText+'</button>':'')+
                '<button type="button" class="'+opt.buttonSaveClass+' btn_save_snd">'+opt.buttonSaveText+'</button>'+
                '</div>'+
            '</div>'+
        '</div>'+
    '</div>';

    $(document.body).append(modal);
    changeEvents(opt);
    // opt.datas = getDatasWithSelect(opt.input);
}
function changeEvents(param={}){
    $(".btn_save_snd").on("click", param.buttonAction);

    var inputs = param.input;
    if(Object.keys(inputs).length==0) return "";
    for(var val in inputs){
        if(inputs[val].onkeyup!=null){
            $("#"+val).keyup(inputs[val].onkeyup);
        }
    }
}
function createInput(inputs={}, opt={}){
    if(Object.keys(inputs).length==0) return "";
    var html = "";

    for(var val in inputs){
        inputs[val].type = inputs[val].type==undefined?"text":inputs[val].type;
        inputs[val].label = inputs[val].label==undefined?"Input":inputs[val].label;
        inputs[val].text = inputs[val].text==undefined?"":inputs[val].text;
        inputs[val].placeholder = inputs[val].placeholder==undefined?"":inputs[val].placeholder;
        inputs[val].onkeyup = inputs[val].onkeyup==undefined?null:inputs[val].onkeyup;

        if(inputs[val].type=="textarea"){
            var textArea = '<div class="form-group '+opt.margin+'">'+
                '<label for="'+val+'">'+inputs[val].label+'</label>'+
                '<textarea class="form-control" id="'+val+'" rows="3" placeholder="'+inputs[val].placeholder+'">'+inputs[val].text+'</textarea>'+
            '</div>';
            html += textArea;
        }else if(inputs[val].type=="select"){
            var select = '<div class="form-group '+opt.margin+'">'+
                '<label for="'+val+'">'+inputs[val].label+'</label>'+
                '<select class="form-select" id="'+val+'">'+
                    inputs[val].text+
                '</select>'+
            '</div>';
            html += select;
        }else if(inputs[val].type=="selectMultiple"){
            var select = '<div class="form-group '+opt.margin+'">'+
                '<label for="'+val+'">'+inputs[val].label+'</label>'+
                '<select multiple class="form-control" id="'+val+'">'+
                    inputs[val].text+
                '</select>'+
            '</div>';
            html += select;
        }else{
            var input = '<div class="form-group '+opt.margin+'">'+
                '<label for="'+val+'">'+inputs[val].label+'</label>'+
                '<input type="'+inputs[val].type+'" class="form-control" id="'+val+'" placeholder="'+inputs[val].placeholder+'" value="'+inputs[val].text+'">' +
            '</div>';
            html += input;
        }
    }
    return html;
}

function getDatasWithSelect(inputs={}){
    var datas = {};
    d = [];
    var ts;
    for(var val in inputs.input){
        ts = $("#"+val);
        if(ts.prop("tagName")!="SELECT"){
            if(inputs.upper==true) ts.val(ts.val().toUpperCase());
            if(inputs.lower==true) ts.val(ts.val().toLowerCase());
            datas[val] = ts.val().trim();
        }else{
            datas[val] = ts.val();
        }
    }
    return datas;
}

// use
// function editModal(){
//     var idModal = "modalEdit";
//     setting = {
//         idModal: idModal,
//         title: "Edicion de becado",
//         buttonText: "Actualizar",
//         upper: true,
//         buttonAction: function(){
//             //get datas
//             var datastmp = getDatasWithSelect(setting);
//             console.log(datastmp);
//         },
//         input: {
//             detalle: {text: "hola como te va", type: "textarea", placeholder: "Ingrese su detalle", label: "Detalles"},
//             partes: {text: "232", type: "text", placeholder: "Ingrese las partes", label: "Fraccionamiento | partes"},
//             monto: {text: "45654", type: "text", placeholder: "Ingrese su monto", label: "Monto total"},
//         }
//     };
//     createModal(setting);
//     $("#"+idModal).modal();
// }

// function editModal(datas={}){
//     var idModal = "modalEdit";
//     var selectItems = '<option value="select1">select 1</option>'+
//                       '<option value="select2">select 2</option>'+
//                       '<option value="select3">select 3</option>'+
//                       '<option value="select4">select 4</option>';
//     setting = {
//         idModal: idModal,
//         title: "Editar",
//         buttonText: "Actualizar",
//         upper: true,
//         margin: "mb-2",
//         buttonAction: function(){
//             //get datas
//             var datastmp = getDatasWithSelect(setting);
//             datastmp.id = datas.id;
            
//             // action
//             console.log(datastmp);
//         },
//         // change datas
//         input: {
//             detalle_ed: {text: datas.data1, type: "textarea", placeholder: "Ingrese texto", label: "TextArea"},
//             monto_ed: {text: datas.data2, type: "number", placeholder: "Ingrese numero", label: "Number", onkeyup: function(){onlyAcceptNumber(this)}},
//             partes_ed: {text: datas.data3, type: "text", placeholder: "Ingrese texto 2", label: "Text", onkeyup: function(){quitarComa(this, '/,/g', ';');}},
//             grupo_ed: {text: selectItems, type: "select", label: "Select"},
//         }
//     };
//     createModal(setting);

//     // botstrap 5+
//     var myModal = new bootstrap.Modal($("#"+idModal)[0]);
//     myModal.show();
//     // botstrap <5
//     // $().modal();
// }