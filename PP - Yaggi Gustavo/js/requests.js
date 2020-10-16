function metodoGet(endpoint,foo){
    var httpGet = new XMLHttpRequest();

    httpGet.onreadystatechange = function(){
        if(httpGet.readyState == 4 && httpGet.status==200){ 
            var response = JSON.parse(httpGet.responseText);

            foo(response);
        }
    } 

    httpGet.open("GET",endpoint,true);
    httpGet.send();
    
} 

function metodoPost(endpoint,jsonObj,foo){
    var httpPost = new XMLHttpRequest();

    httpPost.onreadystatechange = function(){
        if(httpPost.readyState==4 && httpPost.status==200){
            var response = JSON.parse(httpPost.responseText);
            foo(response);
        }
    }

    httpPost.open("POST",endpoint,true);
    httpPost.setRequestHeader("Content-Type","application/json");
    httpPost.send(JSON.stringify(jsonObj));
}

export {metodoGet,metodoPost};
