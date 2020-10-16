function capitalize(string) {
    return string[0].toUpperCase() + string.slice(1);
};

function tablaDinamica(objects,tablaHeaderId,tablaBodyId,addEventListener,foo){

    var tableHeader = document.getElementById(tablaHeaderId);
    var tableBody = document.getElementById(tablaBodyId);

    var propiedades = Object.getOwnPropertyNames(objects[0]);

    var headerRow = document.createElement('tr');
    propiedades.forEach(element => {
        
        var th = document.createElement('th');

        th.hidden = (element.toLowerCase() === 'id')? true : false;
        th.appendChild(document.createTextNode(capitalize(element)));
        headerRow.appendChild(th);

    });
    tableHeader.appendChild(headerRow);

    for (let i = 0; i < objects.length; i++) {
        var row = document.createElement('tr');

        for (let j = 0; j < propiedades.length; j++) {
            var td = document.createElement('td');

            td.hidden = (propiedades[j].toLowerCase() === 'id')? true : false;

            td.setAttribute('name',propiedades[j].toLocaleLowerCase());
            td.appendChild(document.createTextNode(objects[i][propiedades[j]]));
            row.appendChild(td);
        }
        
        row.addEventListener(addEventListener,foo);
        tableBody.appendChild(row);
    } 
}

function removeTD(id,tableBodyId){
    var tableBody = document.getElementById(tableBodyId);
    
    tableBody.childNodes.forEach(tr => {

        if(tr.firstChild.innerText == id){
            tr.remove();
        }
    });
}

function updateTD(json,tableBodyId){
    var tableBody = document.getElementById(tableBodyId);
    var properties = Object.getOwnPropertyNames(json);
    
    tableBody.childNodes.forEach(tr => {

        if(tr.firstChild.innerText == json.id){
           
            for (let i = 0; i < tr.childNodes.length; i++) {
                tr.childNodes[i].innerText = json[properties[i]];
            }     
        }
    });
}

export {tablaDinamica,removeTD,updateTD};
