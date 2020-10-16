function crearFormulario(formularioId,jsonInputs,jsonButtons,hidden = false){

    var formulario = document.getElementById(formularioId);

    var divBotones = document.createElement('div');
    divBotones.setAttribute('id',formularioId+'Botones');

    var divInputs = document.createElement('div');
    divInputs.setAttribute('id',formularioId+'Inputs');

    var divRadios = document.createElement('div');
    divRadios.setAttribute('id',formularioId+'Radios');

    formulario.hidden = hidden;

    var labels = Object.getOwnPropertyNames(jsonInputs);
    var types = Object.values(jsonInputs);
    
    for (let i = 0; i < labels.length; i++) {

        var label = document.createElement('label');
        label.hidden = (labels[i].toLowerCase() === 'id')? true:false;
        label.appendChild(document.createTextNode(labels[i]));
        
        var input = (types[i] != 'select')? document.createElement('input') : document.createElement('select');
        input.disabled = (types[i] === 'select')? true:false;
        input.hidden = (labels[i].toLowerCase() === 'id')? true:false;

        var inputName = (types[i] === 'radio')? 'radioGroup' : labels[i].toLowerCase();

        input.setAttribute('id',labels[i].toLowerCase());
        input.setAttribute('name',inputName);
        input.setAttribute('type',types[i]);

        if(input['type'] === 'radio'){
            divRadios.appendChild(label);
            divRadios.appendChild(input);
            formulario.appendChild(divRadios);
        }
        else{
            label.className = 'formLabel';
            divInputs.appendChild(label);
            divInputs.appendChild(input);
            formulario.appendChild(divInputs);
        }
        
    }

    var btnNames = Object.getOwnPropertyNames(jsonButtons);
    var btnIds = Object.values(jsonButtons);

    for (let i = 0; i < btnNames.length; i++) {
        var button = document.createElement('button');
        var text = document.createTextNode(btnNames[i]);
        button.appendChild(text);

        button.setAttribute('name',btnNames[i]);
        button.setAttribute('id',btnIds[i]);
        divBotones.appendChild(button);

        if(button['name'].toLowerCase() === 'x' || button['name'].toLowerCase() === 'close' || button['name'].toLowerCase() === 'cerrar'){
            button.className = 'closeButton';
            button.onclick = function(){cerrarFormulario(formularioId)};
            button.setAttribute('name','closeForm');
            formulario.appendChild(button);
        }
        else{
            divBotones.appendChild(button);
        }

    }

    formulario.appendChild(divBotones);

    validar(formularioId);
}

function obtenerInputs(formularioId){
    var divInputs = document.getElementById(formularioId+'Inputs');  
    var inputs = [];

    if(divInputs.hasChildNodes)
    {
        divInputs.childNodes.forEach(element => {
            if(element['tagName'].toLowerCase() === 'input' && element['type'] != 'radio'){
                inputs.push(element);
            } 
        });
    }
    
    return inputs;
}

function obtenerRadios(formularioId){
    var divRadios = document.getElementById(formularioId+'Radios');
    
    var radios = [];

    if(divRadios.hasChildNodes)
    {
        divRadios.childNodes.forEach(element => {
            if(element['type'] == 'radio'){
                radios.push(element);
            }  
        });
    }

    return radios;
}

function obtenerSelects(formularioId){
    var divInputs = document.getElementById(formularioId+'Inputs');  
    var selects = [];

    if(divInputs.hasChildNodes)
    {
        divInputs.childNodes.forEach(element => {
            if(element['tagName'].toLowerCase() === 'select'){
                selects.push(element);
            } 
        });
    }
    
    return selects;
}

function mostrarFormulario(formularioId,formularioClass,btnUpdateClass,btbDeleteClass){
    var formulario = document.getElementById(formularioId);
    var divInputs = document.getElementById(formularioId+'Inputs');
    var divBotones = document.getElementById(formularioId+'Botones');
    var divRadios = document.getElementById(formularioId+'Radios');

    formulario.className = formularioClass;
    divInputs.className = 'inputsGroup';
    divRadios.className = 'radioGroup';
    divBotones.className = 'botonesGroup';

    
    if(divBotones.hasChildNodes){
        divBotones.childNodes.forEach(element => {
            element.className = (element['id'] === 'btnUpdate')? btnUpdateClass:btbDeleteClass;
        });
    }
    
    formulario.hidden = false;
}

function cerrarFormulario(formularioId){
    var formulario = document.getElementById(formularioId);

    formulario.hidden = true;
    formulario.removeAttribute('class');
}

function validar(formularioId){
    var inputs = obtenerInputs(formularioId);

    inputs.forEach(element => {
        
        if(element['type'] === 'text'){
            
            element.onchange = function(){
                element.className = (element.value.length < 6)? 'error':'';
            };
        }
        else if(element['type'] === 'number'){

            element.onchange = function(){
                element.className = (element.value >= 0)? 'error':'';
            };
        }
        else if(element['type'] === 'date'){
            element.onchange = function(){
 
                element.className = (Date.parse(element.value) < Date.now())? 'error':'';
            };
        }
    });

}

export {mostrarFormulario,cerrarFormulario,crearFormulario,obtenerInputs,obtenerRadios,obtenerSelects};